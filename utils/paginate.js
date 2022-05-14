const paginate = (jobs) => {
  const itemsPerPage = 10;
  const pages = Math.ceil(jobs.length / itemsPerPage);

  return Array.from({ length: pages }, (_, index) => {
    const start = index * itemsPerPage;
    return jobs.slice(start, start + itemsPerPage);
  });
};

export default paginate;
