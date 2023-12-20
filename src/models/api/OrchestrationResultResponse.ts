export type OrchestrationResultDetails = {
  type: string,
  reason: string,
}

export type OrchestrationResultResponse = {
  status: string,
  details: OrchestrationResultDetails,
}
