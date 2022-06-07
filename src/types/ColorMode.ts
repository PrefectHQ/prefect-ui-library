export const colorModes = [
  'default',
  'deuteranopia',
  'deuteranomaly',
  'protaponia',
  'protanomaly',
] as const

export type ColorMode = typeof colorModes[number]