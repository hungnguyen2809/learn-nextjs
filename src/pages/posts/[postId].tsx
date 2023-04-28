import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  postData: any;
};

const PostDetailPage: React.FC<Props> = ({ postData }) => {
  const router = useRouter();

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

  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  const data: any[] = await response.json();

  return {
    fallback: false,
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

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const data = await response.json();

  return {
    props: {
      postData: data,
    },
  };
};
