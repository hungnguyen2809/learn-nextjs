import { authApi } from '@/apiClient';
import useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';

export function useAuth(options: Partial<PublicConfiguration> = {}) {
  const { data, error, isLoading, mutate } = useSWR('/profile', {
    dedupingInterval: 24 * 60 * 60 * 1000, // 1 day
    revalidateOnFocus: false,
    ...options,
  });

  const firstLoading = data === undefined && error === undefined; //mới đầu vào giá trị là undefined

  const login = async (payload: { username: string; password: string }) => {
    await authApi.login(payload);
    await mutate(); //sau khi mà login thành công thưc hiện featch call api get profile
  };

  const logout = async () => {
    await authApi.logout();
    await mutate(null, false); //logout xóa data và không call lại api profile
  };

  return { profile: data, error, isLoading, firstLoading, login, logout };
}
