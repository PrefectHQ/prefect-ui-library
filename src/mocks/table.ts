import { TableData } from '@prefecthq/prefect-design'
import { MockFunction } from '@/services/Mocker'
import { choice } from '@/utilities'

export type MockTableDataTypes = 'noun' | 'number' | 'boolean' | 'dateString' | 'email' | 'runName'

export type MockTableOverrides = {
  keys?: string[],
  types?: MockTableDataTypes[],
  columnCount?: number,
  rowCount?: number,
}

export const randomTable: MockFunction<TableData[], [Partial<MockTableOverrides>?]> = function(overrides = {}) {
  const defaultColumnCount = this.create('number', [5, 10])
  const defaultRowCount = this.create('number', [10, 20])

  const { columnCount = defaultColumnCount, rowCount = defaultRowCount } = overrides

  const defaultKeys = this.createMany('noun', columnCount)
  const defaultTypes: MockTableDataTypes[] = ['noun', 'number', 'boolean', 'dateString', 'email', 'runName']

  const { keys = defaultKeys, types = defaultTypes } = overrides

  const typesMap: Record<string, MockTableDataTypes> = keys.reduce((acc, key) => ({ ...acc, [key]: choice(types) }), {})
  const table: Record<string, unknown>[] = Array.from({ length: rowCount }, () => {
    const data: Record<string, unknown> = keys.reduce(
      (acc, key) => ({ ...acc, [key]: this.create(typesMap[key]) }),
      {})

    return data
  })
  return table
}
