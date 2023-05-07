import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: { bodyParser: false },
};

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'GET') {
    return res.status(404).json({ message: `method ${req.method} not support` });
  }

  const cookies = new Cookies(req, res);
  cookies.set('access_token');

  res.status(200).json({message: 'logout success'})
}
