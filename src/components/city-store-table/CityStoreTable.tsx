import ConstaTable, {
  ConstaTableProps,
  ConstaTableRow,
} from '@components/consta-table'
import { useAppDispatch, useAppSelector } from '@hooks/store'
import { setCityStoreTableData } from '@store/slices/app'
import React, { useEffect } from 'react'

export interface CityStoreTableRow extends ConstaTableRow {
  value: number
}

const CityStoreTable = () => {
  const dispatch = useAppDispatch()
  const tableData = useAppSelector((s) => s.app.table.data)
  const cityFilter = useAppSelector((s) => s.app.cityFilter.value)
  const nodes = useAppSelector((s) => s.app.nodes)
  const rows = useAppSelector((s) => s.app.rows)

  useEffect(() => {
    const cityNodes = cityFilter ? [cityFilter] : nodes.city
    dispatch(setCityStoreTableData({ ...nodes, city: cityNodes, rows }))
  }, [cityFilter, rows, nodes])

  return (
    <>
      {tableData && (
        <ConstaTable<CityStoreTableRow>
          columns={[
            {
              title: 'Группы складов по городам',
              accessor: 'name',
              width: 400,
            },
            {
              title: 'Итог',
              accessor: 'value',
            },
          ]}
          rows={tableData}
        />
      )}
    </>
  )
}

export default CityStoreTable
