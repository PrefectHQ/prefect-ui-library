export const colorModes = [
  'default',
  'protaponia',
] as const

export type ColorMode = typeof colorModes[number]