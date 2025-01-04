import Papa from "papaparse";

export const loadCsv = (filePath, callback) => {
  Papa.parse(filePath, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: (result) => {
      callback(result.data);
    },
    error: (error) => {
      console.error("CSV 파일 읽기 오류:", error);
    },
  });
};