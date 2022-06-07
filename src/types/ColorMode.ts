export const colorModes = [
  'default',
  'deuteranopia',
  'deuteranomaly',
  'protaponia',
  'protanomaly',
  'tritanomaly',
  'tritanopia',
] as const

export type ColorMode = typeof colorModes[number]