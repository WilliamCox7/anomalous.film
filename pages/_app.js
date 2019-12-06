import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import reset from '../styles/reset';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
        <style jsx global>{reset}</style>
      </>
    );
  }
}

export default MyApp;