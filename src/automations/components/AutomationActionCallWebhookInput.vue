<template>
  <p-content class="automation-action-call-webhook">
    <p-label label="Block" :state="blockDocumentState" :message="blockDocumentError">
      <BlockDocumentInput v-model="blockDocumentId" block-type-slug="webhook" required />
    </p-label>

    <template v-if="isAnonymousBlock">
      <p-message info>
        This webhook action is using an anonymous block. This is most likely because it was migrated from an existing webhook.
      </p-message>
    </template>

    <p-label label="Payload" :state="payloadState" :message="payloadError">
      <p-code-input v-model="payload" :state="payloadState" rows="5" lang="jinja" />
    </p-label>

    <p-message info>
      In addition to any fields present on the triggering event, the following objects can be used in webhook payload templates:
      <p-code inline>
        flow
      </p-code>,
      <p-code inline>
        deployment
      </p-code>,
      <p-code inline>
        flow_run
      </p-code>,
      <p-code inline>
        work_pool
      </p-code>,
      <p-code inline>
        work_queue
      </p-code>, and
      <p-code inline>
        metric
      </p-code>.
    </p-message>
  </p-content>
</template>

<script lang="ts" setup>
  import { useValidation, ValidationRule } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { AutomationActionCallWebhook } from '@/automations/types/actions'
  import BlockDocumentInput from '@/components/BlockDocumentInput.vue'
  import { useBlockDocument, useWorkspaceApi } from '@/compositions'
  import { timeout } from '@/utilities/time'
  import { isRequired } from '@/utilities/validation'

  const props = defineProps<{
    action: Partial<AutomationActionCallWebhook>,
  }>()

  const emit = defineEmits<{
    (event: 'update:action', value: Partial<AutomationActionCallWebhook>): void,
  }>()

  const api = useWorkspaceApi()

  const isValidPayload: ValidationRule<string> = async (value, label, options) => {
    return await isValidTemplate(value, label, options)
  }

  const isValidTemplate: ValidationRule<string> = async (value, label, { signal, source, previousValue }) => {
    if (value === previousValue) {
      return
    }

    if (source === 'validator') {
      await timeout(3000, signal)
    }

    if (signal.aborted) {
      return
    }

    const valid = await api.automations.validateTemplate(value)

    if (valid === true) {
      return true
    }

    return valid
  }

  const blockDocumentId = computed({
    get() {
      return props.action.blockDocumentId ?? ''
    },
    set(blockDocumentId) {
      emit('update:action', { ...props.action, blockDocumentId })
    },
  })
  const { state: blockDocumentState, error: blockDocumentError } = useValidation(blockDocumentId, 'Block', isRequired('Block'))

  const { blockDocument } = useBlockDocument(blockDocumentId)
  const isAnonymousBlock = computed(() => blockDocument.value?.isAnonymous ?? false)

  const payload = computed({
    get() {
      return props.action.payload ?? ''
    },
    set(payload) {
      emit('update:action', { ...props.action, payload })
    },
  })
  const { state: payloadState, error: payloadError } = useValidation(payload, 'Payload', [isRequired('Payload'), isValidPayload])
</script>
