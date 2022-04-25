import Head from 'next/head';

export default function HeadOfPage({ title, content, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={content} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {children}
    </>
  );
}
