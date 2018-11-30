export default ({ data }) => {
  // maxes
  const labels = ['Total Number of Transactions', 'MAX purchase'];
  const values = [];

  if (data && data.length) {
    values.push(data[0].TotalTransactions);
    values.push(data[0].MaxBill);
  }

  return [
    {
      type: 'bar',
      x: labels,
      y: values,
    },
  ];
};
