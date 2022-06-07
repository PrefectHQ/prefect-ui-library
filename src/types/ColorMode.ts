export const colorModes = [
  'default',
  'deuteranopia',
  'deuteranomaly',
  'protaponia',
  'protanomaly',
  '',
  'tritanopia',
] as const

export type ColorMode = typeof colorModes[number]