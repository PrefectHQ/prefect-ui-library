import { EmpiricalPolicy } from '@/models/EmpiricalPolicy'
import { EmpiricalPolicyResponse } from '@/models/EmpiricalPolicyResponse'
import { MapFunction } from '@/services/Mapper'

export const mapEmpiricalPolicyResponseToEmpiricalPolicy: MapFunction<EmpiricalPolicyResponse, EmpiricalPolicy> = function(source: EmpiricalPolicyResponse): EmpiricalPolicy {
  return new EmpiricalPolicy({
    retries: source.retries,
    retryDelay: source.retry_delay,
  })
}

export const mapEmpiricalPolicyToEmpiricalPolicyResponse: MapFunction<EmpiricalPolicy, EmpiricalPolicyResponse> = function(source: EmpiricalPolicy): EmpiricalPolicyResponse {
  return {
    'retries': source.retries,
    'retry_delay': source.retryDelay,
  }
}