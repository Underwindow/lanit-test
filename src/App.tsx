import BrandCityStoreChart from '@components/brand-city-store-chart'
import CityFilter from '@components/city-filter'
import CityStoreTable from '@components/city-store-table'
import { useAppDispatch } from '@hooks/store'
import { fetchAppData, setCityFilterValues } from '@store/slices/app'
import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import React, { useEffect } from 'react'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAppData('data.xlsx'))
  }, [])

  const handleOnFilter = (value?: string) => {
    dispatch(setCityFilterValues({ value }))
  }

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <CityFilter onFilter={handleOnFilter} />
      </Header>
      <Content className="site-layout">
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'start',
            gap: 20,
          }}
        >
          <BrandCityStoreChart />
          <CityStoreTable />
        </div>
      </Content>
    </Layout>
  )
}

export default App
