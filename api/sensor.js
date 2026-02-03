import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const allowedDevices = ["max1", "max2", "max3", "max4"];

export default async function handler(req, res) {
  try {

    /* =======================
       POST (ESP32 → Database)
       ======================= */
    if (req.method === "POST") {

      const {
        device_id,
        temperture,
        humidity,
        pressure,
        windS,
        windD
      } = req.body ?? {};

      // تحقق من الجهاز
      if (!allowedDevices.includes(device_id)) {
        return res.status(400).json({
          error: "Invalid device",
          received: device_id
        });
      }

      // إدخال البيانات
      await sql`
        INSERT INTO weather_data
        (device_id, temperture, humidity, pressure, windS, windD)
        VALUES (
          ${device_id},
          ${Number(temperture)},
          ${Number(humidity)},
          ${Number(pressure)},
          ${Number(windS)},
          ${Number(windD)}
        )
      `;

      return res.status(200).json({
        status: "ok",
        message: "Data inserted successfully"
      });
    }

    /* =======================
       GET (Dashboard ← DB)
       ======================= */
    if (req.method === "GET") {

      const { device } = req.query;

      if (!allowedDevices.includes(device)) {
        return res.status(400).json({
          error: "Invalid device",
          received: device
        });
      }

      const rows = await sql`
        SELECT
          device_id,
          temperture,
          humidity,
          pressure,
          windS,
          windD,
          time
        FROM weather_data
        WHERE device_id = ${device}
        ORDER BY time DESC
      `;

      return res.status(200).json(rows);
    }

    return res.status(405).json({ error: "Method not allowed" });

  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({
      error: "Server error",
      details: err.message
    });
  }
}
