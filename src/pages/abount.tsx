import Button from '@/components/Button';
import Header from '@/components/Header';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

//dynamic: dùng để xử lý việc render component ở server hay không, có nhưng component chỉ trinh duyệt mới chạy
// const Header = dynamic(() => import('@/components/Header'), { ssr: false });

type Props = {
  posts: any[];
};

const AbountPage: React.FC<Props> = ({ posts }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(
      {
        pathname: '/abount',
        query: {
          page: Number(router.query.page || 1) + 1,
        },
      },
      undefined,
      { shallow: true } // khi thay đổi param không chạy lại getStaticProps ở trên serve chỉ chạy lại mỗi client
    );
  };

  return (
    <>
      <Head>
        <title>Abount Page</title>
      </Head>

      <h1>AbountPage</h1>

      <Header />

      <div className="text-center mt-5">
        <ul>
          {posts.map((i) => (
            <li key={i.id}>
              {i.id} - {i.title}
            </li>
          ))}
        </ul>

        <Button onClick={handleClick}>Next Page</Button>
      </div>
    </>
  );
};

export default AbountPage;

export const getStaticProps: GetStaticProps<Props> = async (context: GetStaticPropsContext) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  const data: any[] = await response.json();

  return {
    props: {
      posts: data.map((item) => ({ id: item.id, title: item.title })),
    },
  };
};
