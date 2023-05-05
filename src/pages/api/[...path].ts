import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

//tắt config bodyParser trong next (gửi gì thì truyền như nguyên cái đó lên)
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  //don't send cookies to APIs server
  req.headers.cookie = '';

  proxy.web(req, res, {
    changeOrigin: true, //cho phép đổi baseURL (target)
    selfHandleResponse: false, //để cho thằng proxy này handle response trả về => không cần đoạn dưới xủ lý handle response nữa
    target: process.env.API_URL, //https://js-post-api.herokuapp.com
  });

  // res.status(200).json({ name: 'Hung Nguyen' });
}
