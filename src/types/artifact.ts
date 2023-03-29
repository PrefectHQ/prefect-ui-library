import { ArtifactType, artifactTypes, ResultArtifactData, MarkdownArtifactData, Artifact, ArtifactData, TableArtifactData } from '@/models/Artifact'

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

export function isTableArtifactData(data: ArtifactData): data is TableArtifactData {
  return Array.isArray(data)
}

export function isSerializedArtifactData(type: string, data: ArtifactData): data is string {
  return type !== 'markdown' && type !== 'result' && typeof data === 'string'
}