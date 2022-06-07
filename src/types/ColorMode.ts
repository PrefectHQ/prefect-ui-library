export const colorModes = [
  'default',
  'deuteranopia',
  'protaponia',
  'protanomaly',
] as const

export type ColorMode = typeof colorModes[number]