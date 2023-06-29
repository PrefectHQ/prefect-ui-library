import { Ref, ref, watch } from 'vue'
import { isValidJsonRecord, stringify } from '@/utilities/json'

export type UseJsonRecordValue = Record<string, unknown>

export type UseJsonRecord = {
  valid: Ref<boolean>,
  json: Ref<string>,
  record: Ref<UseJsonRecordValue>,
}

/**
 * The UseJsonRecord composition takes a record or record-parsable string
 * and creates two reactive references: a string and an object.
 * It then sets up watchers to sync changes between these two references.
 * @param initialValues UseJsonRecordValue
 * @returns UseJsonRecord
 */
export function useJsonRecord(initialValues?: UseJsonRecordValue | string): UseJsonRecord {
  const initialValuesIsString = typeof initialValues === 'string'
  const record = ref<UseJsonRecordValue>(initialValuesIsString ? JSON.parse(initialValues) : initialValues)
  const json = ref<string>(stringify(record.value))
  const valid = ref(false)

  watch(json, (newString) => {
    valid.value = isValidJsonRecord(newString)
    if (valid.value) {
      record.value = JSON.parse(newString)
    }
  })

  watch(record, (newRecord) => {
    if (isValidJsonRecord(json.value)) {
      const stringifiedjson = JSON.stringify(JSON.parse(json.value))
      const stringifiedRecord = JSON.stringify(newRecord)
      if (stringifiedjson !== stringifiedRecord) {
        json.value = JSON.stringify(newRecord)
      }
    }
  }, { deep: true })

  return {
    valid,
    json,
    record,
  }
}