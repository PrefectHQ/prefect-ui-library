export type OrchestrationResultDetails = {
  type: string,
  reason: string,
}

export type OrchestrationResult = {
  status: string,
  details: OrchestrationResultDetails,
}
