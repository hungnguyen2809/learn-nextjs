import { GetServerSideProps, GetServerSidePropsContext } from 'next';
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

//mỗi lần request vào là chạy getServerSideProps
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  //cache lại trang s-maxage <= 5s thì trả lại dữ liệu cũ, s-maxage > 5s gọi lại getServerSideProps trả data mới
  context.res.setHeader('Cache-Control', 's-maxage=5');

  //cache lại trang s-maxage<=5s thì trả lại dữ liệu cũ, s-maxage>5s thì trả lại data cũ đồng thời gọi lại 
  // getServerSideProps => lần refresh tiếp theo mới có data mới
  context.res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate');

  //cache lại trang s-maxage<=5s thì trả lại dữ liệu cũ, s-maxage>5s thì trả lại data cũ nếu stale-while-revalidate<=5, 
  //khi stale-while-revalidate>5s gọi lại getServerSideProps => lần refresh tiếp theo mới có data mới
  context.res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=5');

  await new Promise((resolve) => setTimeout(resolve, 3000)); //fake shalow

  return {
    props: {},
  };
};
