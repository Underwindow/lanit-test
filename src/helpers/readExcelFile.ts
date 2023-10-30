import readXlsxFile, { Row } from 'read-excel-file'

export const readExcelFile = async (filePath: string): Promise<Row[]> =>
  fetch(filePath)
    .then((response) => response.blob())
    .then((blob) => readXlsxFile(blob))
