import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const allowedDevices = ["max1", "max2", "max3", "max4"];

export default async function handler(req, res) {
  try {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    /* =======================
       POST (ESP32 → Neon)
       ======================= */
    if (req.method === "POST") {
      const {
        device_id,
        temperature,
        humidity,
        pressure,
        windS,
        windD
      } = req.body ?? {};

      if (!allowedDevices.includes(device_id)) {
        return res.status(400).json({ error: "Invalid device" });
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

    /* =======================
       GET (Dashboard ← Neon)
       ======================= */
    if (req.method === "GET") {
      const { device } = req.query;

      if (!allowedDevices.includes(device)) {
        return res.status(400).json({ error: "Invalid device" });
      }

      const rows = await sql`
        SELECT *
        FROM weather_data
        WHER
