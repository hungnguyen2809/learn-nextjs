import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';

const proxy = httpProxy.createProxyServer();

//tắt config bodyParser trong next (gửi gì thì truyền như nguyên cái đó lên)
export const config = {
  api: { bodyParser: false },
};

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  return new Promise<void>((resolve) => {
    //conver token in cookies into header (Authorization)
    const cookies = Cookies(req, res);
    const access_token = cookies.get('access_token');

    if (access_token) {
      req.headers['Authorization'] = `Bearer ${access_token}`;
    }

    //don't send cookies to APIs server
    req.headers.cookie = '';
    
    //xử lý cho việc nextjs không thấy có response trả về (vì mình đã dùng thằng proxy làm việc đó rồi (11))
    proxy.once('proxyRes', () => resolve());
    proxy.web(req, res, {
      changeOrigin: true, //cho phép đổi baseURL (target)
      selfHandleResponse: false, //cho proxy tự handle response trả về
      target: process.env.API_URL, //https://js-post-api.herokuapp.com
    });
  });
  //  (11): chính là đoạn comment ở đây
  // res.status(200).json({ name: 'Hung Nguyen' });
}
