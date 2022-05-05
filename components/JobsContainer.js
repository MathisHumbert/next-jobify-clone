import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';

import Wrapper from '../wrappers/JobsContainer';
import Job from '../components/Job';

export default function JobsContainer() {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const { searchForm } = useSelector((state) => state.app);
  const { data: session } = useSession();

  const { status, type, sort, position } = searchForm;

  useEffect(() => {
    setLoading(true);
    if (session === undefined) return;

    fetchJobs();
  }, [searchForm, session?.id]);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(
        `/api/jobs/?id=${session.id}&status=${status}&type=${type}&sort=${sort}&position=${position}`
      );
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const deleteJob = async (id) => {
    console.log(id);
    try {
      await axios.delete(`/api/jobs/${id}?userId=${session?.id}`);
      fetchJobs();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>{jobs.length} jobs found</h5>
      <div className='jobs'>
        {jobs.map((job) => (
          <Job job={job} deleteJob={deleteJob} key={job._id.toString()} />
        ))}
      </div>
    </Wrapper>
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
