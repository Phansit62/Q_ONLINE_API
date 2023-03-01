function pagination(pagesize, currentpage, data) {
  let value = data.slice(pagesize * (currentpage - 1), pagesize * currentpage).slice(0, pagesize);

  return {
    statusCode: 200,
    taskStatus: true,
    message: 'Success',
    pagin: {
      totalRow: data.length,
      pageSize: pagesize,
      currentPage: currentpage,
      totalPage: Math.ceil(data.length / pagesize),
    },
    data: value,
  };
}

module.exports = { pagination };
