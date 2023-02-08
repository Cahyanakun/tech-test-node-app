const addPageMetadata = (data, options) => {
  const { count } = data;
  const { limit, page } = options;
  data.totalPages = Math.ceil(count / limit);
  data.currentPage = page;
  data.perPage = limit;
  data.countPerPage = data.rows.length;
  return data;
};

module.exports = {
  addPageMetadata,
};
