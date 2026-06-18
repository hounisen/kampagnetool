export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;

  if (!MAKE_WEBHOOK_URL) {
    return res.status(500).json({ error: "MAKE_WEBHOOK_URL not configured" });
  }

  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to reach Make webhook" });
  }
}
