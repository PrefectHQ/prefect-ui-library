<template>
  <DemoSection heading="JSON Editor">
    <p-content>
      <div>
        <p-button inset size="sm" @click="randomize">
          <p-icon icon="SwitchHorizontalIcon" class="w-3 h-3" />
          Randomize data
        </p-button>
      </div>

      <JsonInput v-model="jsonRef" class="json-editor-section__input" />

      <p-divider />

      Value:
      <p-code multiline>
        {{ jsonRef }}
      </p-code>
    </p-content>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import JsonInput from '@/components/JsonInput.vue'
  import { mocker } from '@/services'
  import { choice } from '@/utilities'

  const jsonRef = ref('')

  const choices = [
    'blockDocument',
    'blockDocumentData',
    'blockSchema',
    'deployment',
    'flow',
    'flowRun',
    'flowRunGraph',
    'flowRunHistory',
    'parameters',
    'schedule',
    'workQueue',
  ] as const

  const randomize = (): void => {
    jsonRef.value = JSON.stringify(mocker.create(choice(choices)), undefined, 2)
  }
</script>

<style>
.json-editor-section__input {
  min-height: 200px;
}
</style>