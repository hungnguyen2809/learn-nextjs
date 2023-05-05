import { MainLayout } from '@/layout';
import { NextPageWithLayout } from '@/models';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  const router = useRouter();

  const handleGotoPosts = () => {
    router.push('/posts');
  };

  const handleGotoPostDetail = () => {
    router.push({
      pathname: '/posts/[postId]',
      query: {
        postId: '123',
        ref: 'social',
      },
    });
  };

  return (
    <>
      <Head>
        <title>Learn Nextjs + Typescript</title>
      </Head>

      <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
        <div className="flex flex-col gap-8">
          <Link href="/abount" className="bg-blue-500 text-white py-2 px-3 rounded-md text-center">
            <span>Goto Abount</span>
          </Link>

          <button className="bg-green-600 text-white py-2 px-3 rounded-md text-center" onClick={handleGotoPosts}>
            <span>Goto PostList</span>
          </button>

          <button className="bg-red-500 text-white py-2 px-3 rounded-md text-center" onClick={handleGotoPostDetail}>
            <span>Goto Post Detail</span>
          </button>
        </div>
      </main>
    </>
  );
};

Home.Layout = MainLayout;
export default Home;
