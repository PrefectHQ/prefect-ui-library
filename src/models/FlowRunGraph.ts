import { GraphNode } from './GraphNode'

export type ModifiedGraphNode = GraphNode & {
  downstreamDependencies?: string[],
}
export type ModifiedGraphData = ModifiedGraphNode[]

export type Layers = Record<string, number>[]
