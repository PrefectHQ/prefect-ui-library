import { IBitmapTextStyle } from 'pixi.js'
import { GraphNode } from './GraphNode'

export type ModifiedGraphNode = GraphNode & {
  downstreamDependencies?: string[],
}
export type ModifiedGraphData = ModifiedGraphNode[]

export type Layers = Record<string, number>[]

export type TextStyles = {
  nodeTextDefault: Partial<IBitmapTextStyle>,
  nodeTextInverse: Partial<IBitmapTextStyle>,
  timeMarkerLabel: Partial<IBitmapTextStyle>,
}
