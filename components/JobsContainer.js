import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import axios from 'axios';

import Wrapper from '../wrappers/JobsContainer';
import Job from '../components/Job';
import filterJobs from '../utils/filterJobs';
import paginate from '../utils/paginate';
import PageBtnContainer from './PageBtnContainer';

export default function JobsContainer({ serverJobs }) {
  const [jobs, setJobs] = useState([]);
  const [stockJobs, setStockJobs] = useState([]);
  const [numberOfJobs, setNumberOfJobs] = useState(0);
  const [page, setPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [onMount, setOnMount] = useState(true);
  const { searchForm } = useSelector((state) => state.app);
  const { data: session } = useSession();

  useEffect(() => {
    const paginateJobs = paginate(serverJobs);
    setJobs(paginateJobs);
    setStockJobs(serverJobs);
    setNumberOfJobs(serverJobs.length);
    setNumberOfPages(paginateJobs.length);
    setOnMount(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (onMount) return;

    const filteredJobs = filterJobs(searchForm, stockJobs);
    const paginateJobs = paginate(filteredJobs);
    setMultipleStates(paginateJobs, filteredJobs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchForm]);

  const deleteJob = async (id) => {
    try {
      await axios.delete(`/api/jobs/${id}?userId=${session?.id}`);
      fetchJobs();
    } catch (error) {
      console.log(error);
    }

    const newStockJobs = stockJobs.filter((job) => job._id !== id);
    const paginateJobs = paginate(newStockJobs);
    setStockJobs(newStockJobs);
    setMultipleStates(paginateJobs, newStockJobs);
  };

  const setMultipleStates = (paginateJobs, allJobs) => {
    setJobs(paginateJobs);
    setNumberOfJobs(allJobs.length);
    setNumberOfPages(paginateJobs.length);
    setPage(page >= paginateJobs.length ? (page === 0 ? 0 : page - 1) : page);
  };

  if (onMount === true) {
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  if (numberOfJobs === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {numberOfJobs} job
        {numberOfJobs > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs[page].map((job) => (
          <Job job={job} deleteJob={deleteJob} key={job._id} />
        ))}
        {numberOfPages > 1 && (
          <PageBtnContainer
            numberOfPages={numberOfPages}
            setPage={setPage}
            page={page}
          />
        )}
      </div>
    </Wrapper>
  );
}
