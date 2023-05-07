import { Button, Loading } from '@/components';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();

  const { profile, isLoading, login, logout } = useAuth({ revalidateOnMount: false });

  const handleLogin = async () => {
    try {
      await login({ username: 'hungnv28', password: 'hungnguyen99' });
      router.push('/abount')
      
    } catch (error) {
      console.error(error);
    }
  };

  // const handleGetProfile = async () => {
  //   try {
  //     const response = await authApi.getProfile();
  //     // setProfile(response.data);
  //   } catch (error: any) {
  //     if (error && error?.response && error.response?.data) {
  //       alert(JSON.stringify(error.response?.data));
  //     }
  //     console.error(error);
  //   }
  // };

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div>
      <h1 className="text-2xl">LoginPage</h1>

      <div className="mt-10 flex flex-col justify-center items-center gap-5">
        <Button type="green" onClick={handleLogin}>
          Login
        </Button>
        {/* <Button type="blue" onClick={handleGetProfile}>
          Get Profile
        </Button> */}
        {/* <Button onClick={handleLogout}>Logout</Button> */}

        {isLoading ? <Loading /> : <div className="mt-20">Profile: {JSON.stringify(profile, undefined, 4)}</div>}
      </div>
    </div>
  );
};

export default LoginPage;
