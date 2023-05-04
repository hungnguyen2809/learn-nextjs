import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  postData: any;
};

const PostDetailPage: React.FC<Props> = ({ postData }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div role="status" className="w-screen animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (!postData) return null;

  return (
    <>
      <Head>
        <title>Post Detail Page</title>
      </Head>

      <h1 className="text-center">PostDetailPage</h1>
      <p>Params: {JSON.stringify(router.query)}</p>
      <hr />

      <div className="mt-5 text-center">{JSON.stringify(postData)}</div>
    </>
  );
};

export default PostDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('\ngetStaticPaths');

  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const data: any[] = await response.json();

  return {
    // false: Nếu không có page thì trả về 404, blocking: tự tạo ra thêm 1 file với param truyền vào
    // true: thì nó có fallback và trong router kiểm tra isFallback = true hiện loading cho người dùng thấy
    fallback: true,
    //tùy vào trong thăng này có bao nhiêu item nó sẽ gọi tương ứng getStaticProps bấy nhiêu lần => tậo ra tương ứng bấy nhiêu file html
    paths: data.map((item) => ({ params: { postId: `${item.id}` } })),
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  console.log('getStaticProps', context.params?.postId); // params: là từ getStaticPaths truyền xuống

  const postId = context.params?.postId;
  if (!postId) {
    return { notFound: true };
  }

  await new Promise((resolve) => setTimeout(resolve, 3000)); //fake shalow
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const data = await response.json();

  if (Object.values(data).length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      postData: data,
    },
    // <5s này sẽ trả lại dữ liệu trang cũ, =5s trả lại dữ liệu cũ đồng thời gọi lại getStaticProps để render trang với dữ liệu mới (ISR)
    revalidate: 5, //thêm giá trị để làm mới dữ liệu của trang (tạo ra cho trang 1 outdate, sau thời gian đó bắt buộc cập nhật dữ liệu)
  };
};
