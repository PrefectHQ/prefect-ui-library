export type CreatedOrUpdatedByType = 'USER' | 'BOT' | 'DEPLOYMENT'

export type CreatedOrUpdatedBy = {
  id: string,
  displayValue: string,
  type: CreatedOrUpdatedByType,
}