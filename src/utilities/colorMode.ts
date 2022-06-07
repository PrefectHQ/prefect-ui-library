import { ColorMode, colorModes } from '@/types/ColorMode'

export const defaultColorMode: ColorMode = 'default'

export function getColorModeClass(mode: ColorMode): string {
  return `color-mode-${mode}`
}

export function isColorMode(value: unknown): value is ColorMode {
  if (typeof value !== 'string') {
    return false
  }

  return colorModes.includes(value as ColorMode)
}

export function applyColorModeClass(mode: ColorMode): void {
  colorModes.forEach(mode => document.body.classList.remove(getColorModeClass(mode)))

  document.body.classList.add(getColorModeClass(mode))
}