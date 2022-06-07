export const colorModes = [
  'default',
  'foo',
] as const

export type ColorMode = typeof colorModes[number]