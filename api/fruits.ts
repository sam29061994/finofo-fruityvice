import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const apiResponse = await fetch("https://www.fruityvice.com/api/fruit/all");
    const data = await apiResponse.json();

    res.status(200).json(data); // Simplified response
  } catch (error) {
    res.status(500).json({
      message: "Error fetching data from Fruityvice",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
