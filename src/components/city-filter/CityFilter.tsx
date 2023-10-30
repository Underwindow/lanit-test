import { useAppSelector } from '@hooks/store'
import { Select } from 'antd'
import React from 'react'

type CityFilterProps = {
  onFilter: (value?: string) => void
}

const CityFilter = ({ onFilter }: CityFilterProps) => {
  const cityList = useAppSelector((s) => s.app.nodes.city)

  return (
    <Select
      allowClear
      onClear={onFilter}
      placeholder="Выберите город"
      onChange={onFilter}
      style={{ width: 200 }}
      options={cityList?.map((c) => ({ label: c, value: c }))}
    />
  )
}

export default CityFilter
