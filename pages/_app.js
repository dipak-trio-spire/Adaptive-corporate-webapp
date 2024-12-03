import React, { useEffect } from 'react';
import Head from 'next/head';
import "@/styles/globals.css";
import { useRouter } from 'next/router';
import useWhiteLabel from '../hooks/useWhiteLabel';
import Layout from "../components/Layout/Layout";
import TagManager from "react-gtm-module";
import HeaderTextProvider from '@/providers/HeaderTextProvider';

function App({ Component, pageProps }) {
  const hostname = useWhiteLabel();
  const router = useRouter();

  useEffect(() => {
    const allowedPaths = ['/tools/riskcontribution', '/tools/importsummary'];
    if (hostname === 'halo' && !allowedPaths.includes(router.pathname)) {
      router.replace('/404');
    }
  }, [hostname, router]);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT === "PRODUCTION") {
      TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID });
    }
  }, []);

  if (!hostname) {
    return <div className="blank-screen"></div>;
  }

  return (
    <React.StrictMode>
      <HeaderTextProvider>
        <Layout hostname={hostname}>
          <Component {...pageProps} />
        </Layout>
      </HeaderTextProvider>
    </React.StrictMode>
  );
}

export default App;