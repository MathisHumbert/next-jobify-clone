import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';
import Wrapper from '../wrappers/JobsContainer';

export default function JobsContainer() {
  const { searchForm } = useSelector((state) => state.app);
  const { data: session } = useSession();
  console.log(searchForm);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(`/api/jobs/${id}`);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, [searchForm, session?.id]);

  return <Wrapper>JobsContainer</Wrapper>;
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
