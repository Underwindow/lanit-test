import EchartsComponent from '@components/echarts'
import { EchartsComponentProps } from '@components/echarts/EchartsComponent'
import { EChartsOption } from 'echarts'
import React from 'react'

export interface SankeyNode {
  name: string
}
export interface SankeyLink {
  source: string
  target: string
  value: number
}

export interface SankeyChartProps extends Partial<Omit<EchartsComponentProps, 'option'>> {
  data: {
    nodes: SankeyNode[]
    links: SankeyLink[]
  }
  option: Omit<EChartsOption, 'series'>
}

const SankeyChart = ({ data, option, ...props }: SankeyChartProps) => {
  return (
    <EchartsComponent
      option={{
        series: [
          {
            type: 'sankey',
            data: data.nodes,
            links: data.links,
          },
        ],
        ...option,
      }}
      {...props}
    />
  )
}

export default SankeyChart
