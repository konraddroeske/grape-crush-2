import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.status(200).json({ data: 'hero data' })
  } catch (err) {
    const error = err as Error
    res.status(500).json({ statusCode: 500, message: error.message })
  }
}
