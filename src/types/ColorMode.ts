export const colorModes = [
  'achromatopsia',
  'deuteranopia',
  'deuteranomaly',
  'protaponia',
  'protanomaly',
  'tritanomaly',
  'tritanopia',
] as const

export type ColorMode = typeof colorModes[number]