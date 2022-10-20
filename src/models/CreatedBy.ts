export type CreatedByType = 'USER'|'BOT'|'DEPLOYMENT'

export type CreatedBy = {
  id: string,
  displayValue: string,
  type: CreatedByType,
}