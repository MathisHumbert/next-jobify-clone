import React from 'react';
import { getSession, useSession } from 'next-auth/react';

import { connectToDatabase } from '../services/mongodb';
import DefaultLayout from '../layouts/DefaultLayout';
import SearchContainer from '../components/SearchContainer';
import JobsContainer from '../components/JobsContainer';

export default function AllJobs({ serverJobs }) {
  console.log(serverJobs);
  return (
    <DefaultLayout>
      <SearchContainer />
      <JobsContainer serverJobs={serverJobs} />
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

  const { db } = await connectToDatabase();
  const jobs = await db
    .collection('jobs')
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return {
    props: {
      session,
      serverJobs: jobs.map((job) => ({
        _id: job._id.toString(),
        position: job.position,
        company: job.company,
        job_location: job.job_location,
        status: job.status,
        job_type: job.job_type,
        userId: job.userId.toString(),
        createdAt: job.createdAt,
      })),
    },
  };
}
