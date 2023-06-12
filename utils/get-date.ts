const getDate = (): string => {
  const date = new Date();
  const day = date.getDay().toString().padStart(2, '0');
  const month = date.getMonth().toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  // const formatted = `${month}/${day}/${year}`;
  const formatted = `${year}-${month}-${day}`;

  return formatted;
};

export default getDate;
