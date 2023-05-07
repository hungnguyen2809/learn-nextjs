import axiosClient from './axiosClient';

export const authApi = {
  login: (body: { username: string; password: string }) => {
    return axiosClient.post('/login', body);
  },
  logout: () => {
    return axiosClient.get('/logout');
  },
  getProfile: () => {
    return axiosClient.get('/profile');
  },
};
