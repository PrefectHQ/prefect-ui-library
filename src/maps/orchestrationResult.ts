import { OrchestrationResult } from '@/models/api/OrchestrationResult'
import { OrchestrationResultResponse } from '@/models/api/OrchestrationResultResponse'
import { MapFunction } from '@/services/Mapper'

export const mapOrchestrationResultResponseToOrchestrationResult: MapFunction<OrchestrationResultResponse, OrchestrationResult> = function(source) {
  return {
    status: source.status,
    details: source.details,
  }
}
