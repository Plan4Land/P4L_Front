import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const useCsvData = (filePath) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadCsv = async () => {
      const response = await fetch(filePath);
      const csvData = await response.text();
      Papa.parse(csvData, {
        complete: (result) => {
          setData(result.data);
        },
        header: true,
      });
    };

    loadCsv();
  }, [filePath]);

  return data;
};

export default useCsvData;