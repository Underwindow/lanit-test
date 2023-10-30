import { EChartsOption, SetOptionOpts } from 'echarts'
import React, { CSSProperties } from 'react'
import { LiquidFillGaugeOption } from 'typings/echarts'
import ReactEcharts from 'echarts-for-react'

export interface EchartsComponentProps {
  option: EChartsOption | LiquidFillGaugeOption
  style?: CSSProperties
  settings?: SetOptionOpts
  loading?: boolean
  theme?: 'light' | 'dark'
}

const EchartsComponent = ({ ...props }: EchartsComponentProps) => (
  <ReactEcharts {...props} />
)

export default EchartsComponent
