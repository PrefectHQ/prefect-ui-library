import { TableData } from '@prefecthq/prefect-design'
import { MockFunction } from '@/services/Mocker'
import { choice } from '@/utilities'

export type MockTableDataTypes = 'noun' | 'number' | 'boolean' | 'date' | 'email' | 'runName'

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
  const defaultTypes: MockTableDataTypes[] = ['noun', 'number', 'boolean', 'date', 'email', 'runName']

  const { keys = defaultKeys, types = defaultTypes } = overrides

  const table: Record<string, unknown>[] = []

  keys.forEach((key) => {
    const type: MockTableDataTypes = choice(types)
    const values = this.createMany(type, rowCount)

    values.forEach((value, index) => {
      table[index] = table[index] || {}
      table[index][key] = value
    })
  })

  return table
}
