import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api', //dùng chung domain => axios tự hiểu domain, chỉ cần gán thêm prefix
});

export default axiosClient;
