if (!('supportedValuesOf' in Intl)) {
  Intl.supportedValuesOf = () => []
}

export const timezones = [
  { label: 'UTC', value: null }, ...Intl.supportedValuesOf('timeZone').map((timezone: string) => {
    return { label: timezone, value: timezone }
  }),
]