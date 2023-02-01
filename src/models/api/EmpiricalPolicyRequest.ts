export type EmpiricalPolicyRequest = {
  retries: number | null,
  retry_delay: number | null,
  pause_keys: unknown[],
  resuming: boolean | null,
}