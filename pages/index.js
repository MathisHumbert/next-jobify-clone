import { getSession } from 'next-auth/react';
import DefaultLayout from '../layouts/DefaultLayout';

export default function Home() {
  return (
    <DefaultLayout>
      <h1>hello world</h1>
    </DefaultLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/register',
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
