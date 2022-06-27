export class CronStringLengthError extends Error {
  public constructor(len: number) {
    super(`Cron statement is too short. Expected >= 5, got ${len}`)
  }
}