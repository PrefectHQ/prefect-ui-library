export interface Schedule {
  timezone: string | null,
  toString: () => string,
  toProseString: () => string,
}
