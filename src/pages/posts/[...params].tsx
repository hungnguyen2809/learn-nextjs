import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const OtherPostPage: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Other Post Page</title>
      </Head>

      <h1>OtherPostPage</h1>

      <p>Params: {JSON.stringify(router.query)}</p>
    </>
  );
};

export default OtherPostPage;
