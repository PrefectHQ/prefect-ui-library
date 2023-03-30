import { ArtifactType, artifactTypes, ResultArtifactData, MarkdownArtifactData, Artifact, ArtifactData, TableArtifactData } from '@/models/Artifact'
import { isRecord } from '@/utilities/object'

export function isArtifactType<T extends ArtifactType>(artifact: Artifact, type: T): artifact is Artifact & { type: T } {
  return artifact.type === type
}

export function isKnownArtifactType(type: unknown): type is ArtifactType & Exclude<ArtifactType, 'unknown'> {
  return typeof type === 'string' && artifactTypes.includes(type as ArtifactType) && type !== 'unknown'
}

export function isResultArtifactData(data: ArtifactData): data is ResultArtifactData {
  return typeof data === 'object'
}

export function isMarkdownArtifactData(data: ArtifactData): data is MarkdownArtifactData {
  return typeof data === 'string'
}

export function isArrayOfMaps(data: unknown): data is Record<string, unknown>[] {
  return Array.isArray(data) && data.every(row => isRecord(row))
}

export function isMapOfArrays(data: unknown): data is Record<string, unknown[]> {
  return !!data && typeof data === 'object' && Object.values(data).every(row => Array.isArray(row))
}

export function isTableArtifactData(data: ArtifactData): data is TableArtifactData {
  return isArrayOfMaps(data) || isMapOfArrays(data)
}