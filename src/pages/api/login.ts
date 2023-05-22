import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';

const proxy = httpProxy.createProxyServer();

//tắt config bodyParser trong next (gửi gì thì truyền như nguyên cái đó lên)
export const config = {
  api: { bodyParser: false },
};

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: `method ${req.method} not support` });
  }

  return new Promise<void>((resolve) => {
    const handleProxyRes: ProxyResCallback = (proxyRes, req, res) => {
      let body = '';
      proxyRes.on('data', function (chunk) {
        body += chunk;
      });
      proxyRes.on('end', function () {
        try {
          const objData = JSON.parse(body);

          if (!proxyRes.statusCode || proxyRes.statusCode >= 400 || proxyRes.statusCode < 200) {
            (res as NextApiResponse).status(proxyRes.statusCode || 500).json(objData);
            return resolve();
          }

          //convert token to cookies
          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV === 'production', //chỉ bảo vệ khi ở môi trường production
          });
          cookies.set('access_token', objData.accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(objData.expiredAt),
          });

          (res as NextApiResponse).status(200).json({ message: 'login success' });
        } catch (error: any) {
          (res as NextApiResponse).status(500).json({ message: error?.message || 'Internal Server Error' });
        }

        resolve();
      });
    };

    //don't send cookies to APIs server
    req.headers.cookie = '';

    //xử lý cho việc nextjs không thấy có response trả về (vì mình đã dùng thằng proxy làm việc đó rồi (11))
    proxy.once('proxyRes', handleProxyRes);
    proxy.web(req, res, {
      changeOrigin: true, //cho phép đổi baseURL (target)
      selfHandleResponse: true, // tự handle response trả về
      target: process.env.API_URL, //https://js-post-api.herokuapp.com
    });
  });
  //  (11): chính là đoạn comment ở đây
  // res.status(200).json({ name: 'Hung Nguyen' });
}
