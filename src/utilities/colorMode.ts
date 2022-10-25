import { ColorMode, colorModes } from '@/types/ColorMode'

export function getColorModeClass(mode: ColorMode | null): string {
  return `color-mode-${mode ?? 'default'}`
}

export function isColorMode(value: unknown): value is ColorMode {
  if (typeof value !== 'string') {
    return false
  }

  return colorModes.includes(value as ColorMode)
}

export function applyColorModeClass(value: ColorMode | null): void {
  colorModes.forEach(mode => document.body.classList.remove(getColorModeClass(mode)))

  const classes = getColorModeClass(value)

  document.body.classList.add(classes)
}