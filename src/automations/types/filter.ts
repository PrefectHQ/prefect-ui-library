export type AutomationSort = 'CREATED_DESC' | 'CREATED_ASC' | 'UPDATED_DESC' | 'NAME_DESC' | 'NAME_ASC'

export type AutomationsFilter = {
  offset?: number,
  sort?: AutomationSort,
  limit?: number,
}