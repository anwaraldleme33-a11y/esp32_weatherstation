

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const allowedDevices = ["max1", "max2", "max3", "max4"];

async function archiveYesterdayData() {
  try {
    // نقل بيانات الأمس إلى جدول الأرشيف
    await sql`
      INSERT INTO weather_archive
        (device_id, temperture, humidity, pressure, windS, windD, reading_date)
      SELECT device_id, temperture, humidity, pressure, windS, windD, DATE(time)
      FROM weather_data
      WHERE DATE(time) = CURRENT_DATE - INTERVAL '1 day'
    `;
    console.log("تم أرشفة بيانات الأمس.");
  } catch (err) {
    console.error("خطأ أثناء الأرشفة:", err);
  }
}

export default async function handler(req, res) {
  try {

    // ===== CORS =====
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    // أرشفة بيانات الأمس عند أي طلب GET أو POST
    await archiveYesterdayData();

    /* ========= POST ========= */
    if (req.method === "POST") {

      const {
        device_id,
        temperture,
        humidity,
        pressure,
        windS,
        windD
      } = req.body ?? {};

      if (!allowedDevices.includes(device_id)) {
        return res.status(400).json({ error: "invalid device" });
      }

      await sql`
        INSERT INTO weather_data
        (device_id, temperture, humidity, pressure, windS, windD)
        VALUES (
          ${device_id},
          ${Number(temperture)},
          ${Number(humidity)},
          ${Number(pressure)},
          ${Number(windS)},
          ${windD}
        )
      `;

      return res.status(200).json({ status: "saved" });
    }

    /* ========= GET ========= */
    if (req.method === "GET") {

      const { device } = req.query;

      if (!allowedDevices.includes(device)) {
        return res.status(400).json({ error: "invalid device" });
      }

      // البيانات الحالية
      const todayRows = await sql`
        SELECT *
        FROM weather_data
        WHERE device_id = ${device} AND DATE(time) = CURRENT_DATE
        ORDER BY time ASC
      `;

      // بيانات الأمس من الأرشيف
      const yesterdayRows = await sql`
        SELECT *
        FROM weather_archive
        WHERE device_id = ${device} AND reading_date = CURRENT_DATE - INTERVAL '1 day'
        ORDER BY reading_date ASC
      `;

      return res.status(200).json({
        today: todayRows,
        yesterday: yesterdayRows
      });
    }

    return res.status(405).json({ error: "method not allowed" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "server error",
      details: err.message
    });
  }
}
