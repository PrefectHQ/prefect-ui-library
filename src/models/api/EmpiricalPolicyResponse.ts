export type EmpiricalPolicyResponse = {
  retries: number | null,
  retry_delay: number | null,
  max_retries: number | null,
  retry_delay_seconds: number | null,
  retry_jitter_factor: number | null,
}