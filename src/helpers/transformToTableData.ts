import { CityStoreTableRow } from '@components/city-store-table'
import _ from 'lodash'
import { Row } from 'read-excel-file'

export const transformToTableData = (columns: string[][], rows: Row[]) => {
  const [cityNames, storageNames] = columns

  return cityNames.reduce((cityRows, currCity, i) => {
    const currRows = rows.filter(([, city]) => city === currCity)

    const childrenRows = storageNames.reduce((storageRows, currStorage, j) => {
      const storageRowsByCity = currRows.filter(
        ([, , storage]) => storage === currStorage
      )

      if (storageRowsByCity.length) {
        storageRows.push({
          id: `row${i}.${j}`,
          name: currStorage,
          value: storageRowsByCity
            .map(([, , , total]) => total as number)
            .reduce((acc, v) => acc + v, 0),
        })
      }

      return storageRows
    }, [] as CityStoreTableRow[])

    return cityRows.concat({
      id: `row${i}`,
      name: currCity,
      value: childrenRows.map((r) => r.value).reduce((acc, v) => acc + v, 0),
      rows: childrenRows,
    })
  }, [] as CityStoreTableRow[])
}
