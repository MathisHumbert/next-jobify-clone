import React from 'react';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { setJobForm } from '../features/appSlice';
import Wrapper from '../wrappers/Job';
import JobInfo from './JobInfo';

export default function Job({ job, deleteJob }) {
  const { _id, position, company, job_location, status, createdAt, job_type } =
    job;
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo text={job_location} icon={<FaLocationArrow />} />
          <JobInfo
            text={moment(createdAt).format('MMM Do YYYY')}
            icon={<FaCalendarAlt />}
          />
          <JobInfo text={job_type} icon={<FaBriefcase />} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='action'>
            <span onClick={() => dispatch(setJobForm({ job, id: _id }))}>
              <Link href='/add-job' passHref>
                <a className='btn edit-btn'>Edit</a>
              </Link>
            </span>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteJob(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
}
