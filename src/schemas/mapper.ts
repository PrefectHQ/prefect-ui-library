import { maps } from '@/schemas/maps'
import { Mapper } from '@/services/Mapper'

export const mapper = new Mapper(maps)

export type MapFunction<S, D> = (this: typeof mapper, source: S) => D