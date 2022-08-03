import { EmpiricalPolicy } from '@/models/EmpiricalPolicy'
import { EmpiricalPolicyResponse } from '@/models/EmpiricalPolicyResponse'
import { MapFunction } from '@/services/Mapper'

export const mapEmpiricalPolicyResponseToEmpiricalPolicy: MapFunction<EmpiricalPolicyResponse, EmpiricalPolicy> = function(source: EmpiricalPolicyResponse): EmpiricalPolicy {
  return new EmpiricalPolicy({
    maxRetries: source.max_retries,
    retryDelaySeconds: source.retry_delay_seconds,
  })
}

export const mapEmpiricalPolicyToEmpiricalPolicyResponse: MapFunction<EmpiricalPolicy, EmpiricalPolicyResponse> = function(source: EmpiricalPolicy): EmpiricalPolicyResponse {
  return {
    'max_retries': source.maxRetries,
    'retry_delay_seconds': source.retryDelaySeconds,
  }
}