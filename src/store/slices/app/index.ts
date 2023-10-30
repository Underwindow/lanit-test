import { CityStoreTableRow } from '@components/city-store-table'
import { SankeyChartProps } from '@components/sankey-chart'
import { readExcelFile } from '@helpers/readExcelFile'
import { transformToSankey } from '@helpers/transformToSankeyData'
import { transformToTableData } from '@helpers/transformToTableData'
import { LoadingStatus } from '@models/loadingStatus'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import { Row } from 'read-excel-file'

type Nodes = { brand: string[]; city: string[]; storage: string[] }

interface AppState {
  nodes: Nodes
  headers: Row
  rows: Row[]
  table: {
    data?: CityStoreTableRow[]
  }
  sankey: {
    data?: SankeyChartProps['data']
  }
  cityFilter: {
    value?: string
  }
  status?: LoadingStatus
}

export const fetchAppData = createAsyncThunk(
  'app/fetchAppData',
  (publicPath: string, { dispatch }) =>
    readExcelFile(publicPath).then((data) => {
      const headers = data[0]
      const rows = data.slice(1)
      const tr = _.zip.apply(_, data.slice(1))

      const [brand, city, storage] = tr
        .slice(0, -1)
        .map((values, _index) => _.uniq(values))

      const nodes = { brand, city, storage } as Nodes
      dispatch(setSanKeyData({ ...nodes, rows }))
      dispatch(setCityStoreTableData({ ...nodes, rows }))

      return {
        nodes,
        headers,
        rows,
      }
    })
)

const initialState: AppState = {
  nodes: {
    brand: [],
    city: [],
    storage: [],
  },
  headers: [],
  rows: [],
  table: {},
  sankey: {},
  cityFilter: {},
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCityFilterValues: (
      state,
      { payload }: PayloadAction<AppState['cityFilter']>
    ) => {
      state.cityFilter = payload
    },
    setSanKeyData: (
      state,
      { payload }: PayloadAction<Nodes & { rows: Row[] }>
    ) => {
      const { brand, city, storage, rows } = payload

      state.sankey.data = transformToSankey([brand, city, storage], rows)
    },
    setCityStoreTableData: (
      state,
      { payload }: PayloadAction<Nodes & { rows: Row[] }>
    ) => {
      const { city, storage, rows } = payload

      state.table.data = transformToTableData([city, storage], rows)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAppData.pending, (state) => {
      state.status = LoadingStatus.Pending
    })
    builder.addCase(fetchAppData.fulfilled, (state, { payload }) => {
      state.status = LoadingStatus.Ok
      state.nodes = payload.nodes
      state.headers = payload.headers
      state.rows = payload.rows
    })
    builder.addCase(fetchAppData.rejected, (state) => {
      state.status = LoadingStatus.Error
    })
  },
})

export const { setSanKeyData, setCityStoreTableData, setCityFilterValues } =
  appSlice.actions
