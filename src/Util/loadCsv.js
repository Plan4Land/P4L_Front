import Papa from "papaparse";

const loadCsv = async (filePath) => {
  const response = await fetch(filePath);
  const csvText = await response.text();
  const { data } = Papa.parse(csvText, { header: true });
  return data;
};

export default loadCsv;
