export const colorModes = [
  'default',
  'protaponia',
  'protanomaly',
] as const

export type ColorMode = typeof colorModes[number]