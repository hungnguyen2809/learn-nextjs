import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const PostDetailPage: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Post Detail Page</title>
      </Head>

      <h1>PostDetailPage</h1>
      
      <p>Params: {JSON.stringify(router.query)}</p>
    </>
  );
};

export default PostDetailPage;
