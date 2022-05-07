import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import axios from 'axios';

import Wrapper from '../wrappers/JobsContainer';
import Job from '../components/Job';
import moment from 'moment';

export default function JobsContainer({ serverJobs }) {
  const [jobs, setJobs] = useState([]);
  const [stockJobs, setStockJobs] = useState([]);
  const [onMount, setOnMount] = useState(true);
  const { searchForm } = useSelector((state) => state.app);
  const { data: session } = useSession();

  useEffect(() => {
    setJobs(serverJobs);
    setStockJobs(serverJobs);
    setOnMount(false);
  }, []);

  //  USE THIS WAY TO FILTER DATA WITHOUT CALLING API
  useEffect(() => {
    if (onMount) return;
    const { position, status, type, sort } = searchForm;

    let tempJobs = stockJobs;

    if (position) {
      tempJobs = tempJobs.filter(
        (job) => job.position.includes(position) === true
      );
    }

    if (status !== 'all') {
      tempJobs = tempJobs.filter((job) => job.status === status);
    }

    if (type !== 'all') {
      tempJobs = tempJobs.filter((job) => job.job_type == type);
    }

    if (sort === 'a-z') {
      tempJobs = tempJobs.sort((a, b) => b.position.localeCompare(a.position));
    } else if (sort === 'z-a') {
      tempJobs = tempJobs.sort((a, b) => a.position.localeCompare(b.position));
    } else if (sort === 'oldest') {
      tempJobs = tempJobs.sort(
        (a, b) => moment(b.createdAt) - moment(a.createdAt)
      );
    } else {
      tempJobs = tempJobs.sort(
        (a, b) => moment(a.createdAt) - moment(b.createdAt)
      );
    }

    setJobs(tempJobs);
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
