<template>
  <p-content class="automation-action-send-notification">
    <p-label label="Block" :state="blockDocumentState" :message="blockDocumentError">
      <BlockCapabilityBlockDocumentInput v-model="blockDocumentId" :state="blockDocumentState" capability="notify" required use-modal />
    </p-label>

    <template v-if="isAnonymousBlock">
      <p-message info>
        This notification action is using an anonymous block. This is most likely because it was migrated from an existing notification.
      </p-message>
    </template>

    <p-label label="Subject" :state="subjectState" :message="subjectError">
      <p-code-input v-model="subject" :state="subjectState" lang="jinja" />
    </p-label>

    <p-label label="Body" :state="bodyState" :message="bodyError">
      <p-code-input v-model="body" :state="bodyState" rows="5" lang="jinja" />
    </p-label>

    <p-message info>
      In addition to any fields present on the triggering event, the following objects can be used in notification templates: <p-code inline>flow</p-code>, <p-code inline>deployment</p-code>, <p-code inline>flow_run</p-code>, <p-code inline>work_pool</p-code>, <p-code inline>work_queue</p-code>, and <p-code inline>metric</p-code>.
    </p-message>
  </p-content>
</template>

<script lang="ts" setup>
  import { useValidation, ValidationRule } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { AutomationActionSendNotification } from '@/automations/types/actions'
  import BlockCapabilityBlockDocumentInput from '@/components/BlockCapabilityBlockDocumentInput.vue'
  import { useBlockDocument, useWorkspaceApi } from '@/compositions'
  import { timeout } from '@/utilities/time'
  import { isRequired } from '@/utilities/validation'

  const props = defineProps<{
    action: Partial<AutomationActionSendNotification>,
  }>()

  const emit = defineEmits<{
    (event: 'update:action', value: Partial<AutomationActionSendNotification>): void,
  }>()

  const api = useWorkspaceApi()

  const isValidSubject: ValidationRule<string> = async (value, label, options) => {
    return await isValidTemplate(value, label, options)
  }

  const isValidBody: ValidationRule<string> = async (value, label, options) => {
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

  const subject = computed({
    get() {
      return props.action.subject ?? ''
    },
    set(subject) {
      emit('update:action', { ...props.action, subject })
    },
  })
  const { state: subjectState, error: subjectError } = useValidation(subject, 'Subject', [isRequired('Subject'), isValidSubject])

  const body = computed({
    get() {
      return props.action.body ?? ''
    },
    set(body) {
      emit('update:action', { ...props.action, body })
    },
  })
  const { state: bodyState, error: bodyError } = useValidation(body, 'Body', [isRequired('Body'), isValidBody])
</script>
