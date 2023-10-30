import SankeyChart from '@components/sankey-chart'
import { useAppDispatch, useAppSelector } from '@hooks/store'
import { setSanKeyData } from '@store/slices/app'
import React, { useEffect } from 'react'

const BrandCityStoreChart = () => {
  const dispatch = useAppDispatch()
  const sanKeyData = useAppSelector((s) => s.app.sankey.data)
  const cityFilter = useAppSelector((s) => s.app.cityFilter.value)
  const nodes = useAppSelector((s) => s.app.nodes)
  const rows = useAppSelector((s) => s.app.rows)

  useEffect(() => {
    const cityNodes = cityFilter ? [cityFilter] : nodes.city
    dispatch(setSanKeyData({ ...nodes, city: cityNodes, rows }))
  }, [cityFilter, rows, nodes])

  return (
    <>
      {sanKeyData && (
        <SankeyChart
          data={sanKeyData}
          style={{
            width: '900px',
            height: '800px',
            flexBasis: '50%',
          }}
          option={{
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove',
            },
          }}
        />
      )}
    </>
  )
}

export default BrandCityStoreChart
