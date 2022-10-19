import { timeZone } from '@/shims/intl'

export const intl = {
  timeZone: () => {
    if (!('supportedValuesOf' in Intl)) {
      return timeZone
    }

    return Intl.supportedValuesOf('timeZone')
  },
}