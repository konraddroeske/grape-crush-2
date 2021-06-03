import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.status(200).json({ data: "hero data" })
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
