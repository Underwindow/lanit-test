import { SankeyLink } from '@components/sankey-chart'
import _ from 'lodash'
import { Row } from 'read-excel-file'

export const transformToSankey = (columns: string[][], data: Row[]) => {
  columns.forEach((names) => _.remove(names, (n) => !n || n === '-'))

  const links = columns.reduce((acc, names, i, self) => {
    if (i === self.length - 1) return acc

    return acc.concat(
      names.reduce((result, source) => {
        const rowsBySource = data.filter((row) => row[i] === source)
        return result.concat(
          self[i + 1].reduce((parsedLinks, target) => {
            const targetsBySource = rowsBySource.filter(
              (row) => row[i + 1] === target
            )

            if (targetsBySource.length) {
              parsedLinks.push({
                source: source,
                target: target,
                value: targetsBySource
                  .map(([, , , total]) => total as number)
                  .reduce((acc, v) => acc + v, 0),
              })
            }

            return parsedLinks
          }, [] as SankeyLink[])
        )
      }, [] as SankeyLink[])
    )
  }, [] as SankeyLink[])

  const nodes = _.uniq(
    links.reduce(
      (acc, { target, source }) => acc.concat([target, source]),
      [] as string[]
    )
  ).map((name) => ({ name }))

  return { nodes, links }
}
