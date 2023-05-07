import { authApi } from '@/apiClient';
import { Button } from '@/components';
import React, { useState } from 'react';

const LoginPage = () => {
  const [profile, setProfile] = useState({});

  const handleLogin = async () => {
    try {
      await authApi.login({ username: 'hungnv28', password: 'hungnguyen99' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetProfile = async () => {
    try {
      const response = await authApi.getProfile();
      setProfile(response.data);
    } catch (error: any) {
      if (error && error?.response && error.response?.data) {
        alert(JSON.stringify(error.response?.data));
      }
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl">LoginPage</h1>

      <div className="mt-10 flex flex-col justify-center items-center gap-5">
        <Button onClick={handleLogin}>Login</Button>
        <Button type="blue" onClick={handleGetProfile}>
          Get Profile
        </Button>
        <Button onClick={handleLogout}>Logout</Button>

        <div className="mt-20">Profile: {JSON.stringify(profile)}</div>
      </div>
    </div>
  );
};

export default LoginPage;
