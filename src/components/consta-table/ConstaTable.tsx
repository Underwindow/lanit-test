import React from 'react'
import { Table, TableProps, TableRow } from '@consta/uikit/Table'

export interface ConstaTableRow extends TableRow {
  name: string
  rows?: ConstaTableRow[]
}

export type ConstaTableProps<T extends ConstaTableRow = ConstaTableRow> =
  TableProps<T>

const ConstaTable = <T extends ConstaTableRow = ConstaTableRow>({
  ...props
}: ConstaTableProps<T>) => {
  return <Table {...props} />
}

export default ConstaTable
