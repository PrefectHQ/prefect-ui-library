export type Paginated<TResult> = {
  results: TResult[],
  limit: number,
  page: number,
  pages: number,
  count: number,
}