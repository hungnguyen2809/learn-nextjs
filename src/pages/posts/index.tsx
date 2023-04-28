import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import React from 'react';

type Props = {
  posts: any[];
};

const PostListPage: React.FC<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>PostList Page</title>
      </Head>

      <div>PostListPage</div>
      <hr />

      <div className="text-center mt-5">
        <ul>
          {posts.map((i) => (
            <li key={i.id}>
              {i.id} - {i.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PostListPage;

//getStaticProps :chạy ở serve trong lúc build time, và pass lại vào trong props của component
//NOTE: hàm này chỉ đc dùng trong file index của page, không dùng được trong các component con của page
//NOTE: hàm này không đc dùng chung với getServerSideProps
export const getStaticProps: GetStaticProps<Props> = async (context: GetStaticPropsContext) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data: any[] = await response.json();

  return {
    props: {
      posts: data.map((item) => ({ id: item.id, title: item.title })),
    },
  };
};
