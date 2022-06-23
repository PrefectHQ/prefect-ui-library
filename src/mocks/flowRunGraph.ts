import { GraphNode, TaskRunInputType } from '@/models'
import { MockFunction } from '@/services/Mocker'
import { floor, random } from '@/utilities/math'

export type Shape = 'linear' | 'fanOut' | 'fanOutIn'
export type GraphOptions = {
  shape?: Shape,
  size?: number,
  fanMultiplier?: number,
}

export type UpstreamReference = {
  id: string,
  inputType: TaskRunInputType,
}

export const randomGraphNode: MockFunction<GraphNode, [Partial<GraphNode>?]> = function(overrides = {}) {
  return new GraphNode({
    id: this.create('id'),
    upstreamDependencies: [],
    state: this.create('state'),
    estimatedRunTime: this.create('number'),
    expectedStartTime: this.create('date'),
    totalRunTime: this.create('number'),
    startTime: this.create('date'),
    endTime: this.create('date'),
    ...overrides,
  })
}

export const randomFlowRunGraph: MockFunction<GraphNode[], [Partial<GraphOptions>?]> = function(options = {}) {
  const nodes: GraphNode[] = []
  const { size = 3, shape = 'linear', fanMultiplier = 1 } = options

  // Create nodes
  while (nodes.length < size) {
    const target: GraphNode = this.create('graphNode')

    const proxy = new Proxy(target, {})
    nodes.push(proxy)
  }

  // Create dependency tree
  if (shape == 'linear') {
    for (let i = 1; i < nodes.length; ++i) {
      const upstreamReference: UpstreamReference = { id: nodes[i - 1].id, inputType: 'task_run' }
      nodes[i].upstreamDependencies = [upstreamReference]
    }
  }

  if (shape == 'fanOut' || shape == 'fanOutIn') {
    let row = 0
    const rows = []

    const incRow = (): void => {
      row++
      rows[row] = []
    }

    nodeLoop: for (let i = 0; i < nodes.length; ++i) {
      if (row == 0) {
        rows.push([nodes[i]])
        incRow()
        continue
      }

      const currRow = rows[row]
      const prevRow = rows[row - 1]
      const currLen = currRow.length
      const prevLen = prevRow.length

      const upstreamNode = prevRow[floor(random() * prevLen)]
      const upstreamReference: UpstreamReference = { id: upstreamNode.id, inputType: 'task_run' }

      nodes[i].upstreamDependencies = [upstreamReference]

      if (shape == 'fanOut') {
        if (currLen + 1 >= prevLen * fanMultiplier) {
          rows[row].push(nodes[i])
          incRow()
          continue nodeLoop
        }
      }

      if (shape == 'fanOutIn') {
        if (i > nodes.length / 2) {
          if ((currLen + 1) * fanMultiplier >= prevLen) {
            rows[row].push(nodes[i])
            incRow()
            continue nodeLoop
          }
        }

        if (currLen + 1 >= prevLen * fanMultiplier) {
          rows[row].push(nodes[i])
          incRow()
          continue nodeLoop
        }

      }

      rows[row].push(nodes[i])

    }
  }

  return nodes
}