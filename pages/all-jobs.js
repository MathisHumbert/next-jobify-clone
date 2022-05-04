import React from 'react';

import DefaultLayout from '../layouts/DefaultLayout';
import SearchContainer from '../components/SearchContainer';
import JobsContainer from '../components/JobsContainer';

export default function AllJobs() {
  return (
    <DefaultLayout>
      <SearchContainer />
      <JobsContainer />
    </DefaultLayout>
  );
}
