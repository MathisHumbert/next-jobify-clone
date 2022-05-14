import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import moment from 'moment';

import Wrapper from '../wrappers/JobsContainer';
import Job from '../components/Job';
import filterJobs from '../utils/filterJobs';

export default function JobsContainer({ serverJobs }) {
  // const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [stockJobs, setStockJobs] = useState([]);
  const [onMount, setOnMount] = useState(true);
  const { searchForm } = useSelector((state) => state.app);
  const { data: session } = useSession();

  useEffect(() => {
    setJobs(serverJobs);
    setStockJobs(serverJobs);
    setOnMount(false);
    // setLoading(true)
  }, []);

  //  USE THIS WAY TO FILTER DATA WITHOUT CALLING API
  useEffect(() => {
    if (onMount) return;

    const filteredJobs = filterJobs(searchForm, stockJobs);
    setJobs(filteredJobs);
  }, [searchForm]);

  // CAN USE THIS WAY TO GET AND FILTER DATA BY CALLING THE API
  // useEffect(() => {
  //   setLoading(true);
  //   if (session === undefined) return;

  //   fetchJobs();
  // }, [searchForm, session?.id]);

  // const fetchJobs = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `/api/jobs/?id=${session.id}&status=${status}&type=${type}&sort=${sort}&position=${position}`
  //     );
  //     setJobs(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLoading(false);
  // };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`/api/jobs/${id}?userId=${session?.id}`);
      fetchJobs();
    } catch (error) {
      console.log(error);
    }

    setJobs(jobs.filter((job) => job._id !== id));
    setStockJobs(stockJobs.filter((job) => job._id !== id));
  };

  if (onMount === true) {
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  // if (loading === true) {
  //   return (
  //     <Wrapper>
  //       <h2>Loading...</h2>
  //     </Wrapper>
  //   );
  // }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {jobs.length} job
        {jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => (
          <Job job={job} deleteJob={deleteJob} key={job._id} />
        ))}
      </div>
    </Wrapper>
  );
}
