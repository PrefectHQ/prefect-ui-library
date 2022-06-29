import { computed, Ref } from 'vue'

// copied and slightly modified from vee-validate since its not exported...
type GenericValidateFunction = (value: unknown) => boolean | string | Promise<boolean | string>
type Rules = GenericValidateFunction | GenericValidateFunction[] | undefined

export function useOptionalRules(rules: Rules, apply: Ref<boolean>): Ref<Rules> {
  return computed(() => apply.value ? rules : undefined)
}