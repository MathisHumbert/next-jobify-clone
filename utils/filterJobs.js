const filterJobs = (searchForm, stockJobs) => {
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

  return tempJobs;
};

export default filterJobs;
