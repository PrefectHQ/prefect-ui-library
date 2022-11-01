// necessary until this Typescript issue is closed
// https://github.com/microsoft/TypeScript/issues/49231
declare namespace Intl {
  type Key = 'calendar' | 'collation' | 'currency' | 'numberingSystem' | 'timeZone' | 'unit'

  function supportedValuesOf(input: Key): string[]
}