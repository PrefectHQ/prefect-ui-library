import { Ref, readonly, ref } from 'vue'
import { ColorMode, colorModes } from '@/types/ColorMode'

const internalValue = ref<ColorMode | null>(null)

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

  internalValue.value = value
}

type UseColorMode = {
  value: Readonly<Ref<ColorMode | null>>,
}

export function useColorMode(): UseColorMode {
  return {
    value: readonly(internalValue),
  }
}