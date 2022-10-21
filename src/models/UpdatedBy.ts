export type UpdatedByType = 'USER'|'BOT'|'DEPLOYMENT'

export type UpdatedBy = {
  id: string,
  displayValue: string,
  type: UpdatedByType,
}