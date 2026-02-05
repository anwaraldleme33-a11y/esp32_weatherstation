import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const allowedDevices = ["max1", "max2", "max3", "max4"];

export default async function handler(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    /* ========= POST ========= */
    if (req.method === "POST") {

      const body = req.body ?? {};

      const device_id = body.device_id;

      // دعم الاسمين
      const temperature =
        body.temperature ?? body.temperture;

      const humidity = body.humidity;
      const pressure = body.pressure;
      const windS = body.windS;
      const windD = body.windD;

      if (!allowedDevices.includes(device_id)) {
        return res.status(400).json({ error: "Invalid device" });
      }

      if (temperature === undefined) {
        return res.status(400).json({
          error: "temperature missing"
        });
      }

      await sql`
        INSERT INTO weather_data
        (device_id, temperature, humidity, pressure, windS, windD)
        VALUES (
          ${device_id},
          ${Number(temperature)},
          ${Number(humidity)},
          ${Number(pressure)},
          ${Number(windS)},
          ${windD}
        )
      `;

      return res.status(200).json({ status: "ok" });
    }

    /* ========= GET ========= */
    if (req.method === "GET") {
      const { device } = req.query;

      if (!allowedDevices.includes(device)) {
        return res.status(400).json({ error: "Invalid device" });
      }

      const rows = await sql`
        SELECT *
        FROM weather_data
        WHERE device_id = ${device}
        ORDER BY created_at ASC
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
