export function removePrefectEventLabelPrefix(value: string): string {
  if (value.startsWith('prefect.') || value.startsWith('prefect-cloud.')) {
    return value.split('.').slice(1).join('.')
  }

  return value
}