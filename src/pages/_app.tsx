import axiosClient from '@/apiClient/axiosClient';
import { EmptyLayout } from '@/layout';
import { AppPropsWithLayout } from '@/models';
import '@/styles/globals.css';
import { SWRConfig } from 'swr';

const options = {
  shouldRetryOnError: false,
  fetcher: (url: string) => axiosClient.get(url).then(res => res.data),
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <SWRConfig value={options}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
