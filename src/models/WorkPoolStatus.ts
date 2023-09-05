export const workPoolStatus = ['ready', 'not_ready', 'paused'] as const

export type WorkPoolStatus = typeof workPoolStatus[number] | null
export type ServerWorkPoolStatus = Uppercase<typeof workPoolStatus[number]> | null