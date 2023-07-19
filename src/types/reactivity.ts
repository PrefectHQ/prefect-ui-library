import { Ref } from 'vue'
import { AnyArray, AnyRecord } from '@/types/any'

export type Getter<T> = () => T
export type MaybeRef<T> = Ref<T> | T
export type MaybeGetter<T> = Getter<T> | T

export type MaybeReactive<T extends object> = T | {
  [P in keyof T]: [T[P]] extends [object | undefined]
    ? [T[P]] extends [AnyRecord | undefined]
      ? MaybeRef<Exclude<T[P], undefined>> | MaybeReactive<Exclude<T[P], undefined>>
      : [T[P]] extends [AnyArray | undefined]
        ? MaybeRef<Exclude<T[P], undefined>>
        : MaybeRef<T[P]>
    : MaybeRef<T[P]>
}