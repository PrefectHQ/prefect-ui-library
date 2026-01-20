import { EmpiricalPolicyRequest } from '@/models/api/EmpiricalPolicyRequest'
import { EmpiricalPolicyResponse } from '@/models/api/EmpiricalPolicyResponse'
import { EmpiricalPolicy } from '@/models/EmpiricalPolicy'
import { MapFunction } from '@/services/Mapper'

export const mapEmpiricalPolicyResponseToEmpiricalPolicy: MapFunction<EmpiricalPolicyResponse, EmpiricalPolicy> = function(source) {
  return new EmpiricalPolicy({
    retries: source.retries,
    retryDelay: source.retry_delay ?? source.retry_delay_seconds,
    maxRetries: source.max_retries,
    retryJitterFactor: source.retry_jitter_factor,
    retryDelaySeconds: source.retry_delay_seconds,
  })
}

export const mapEmpiricalPolicyToEmpiricalPolicyResponse: MapFunction<EmpiricalPolicy, EmpiricalPolicyResponse> = function(source) {
  return {
    retries: source.retries,
    retry_delay: source.retryDelay,
    max_retries: source.maxRetries,
    retry_jitter_factor: source.retryJitterFactor,
    retry_delay_seconds: source.retryDelaySeconds,
  }
}

export const mapEmpiricalPolicyToEmpiricalPolicyRequest: MapFunction<EmpiricalPolicy, EmpiricalPolicyRequest> = function(source) {
  return {
    'retries': source.retries,
    'retry_delay': source.retryDelay,
    'pause_keys': [],
    'resuming': false,
  }
}