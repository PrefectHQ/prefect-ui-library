<template>
  <DemoSection heading="JSON Editor">
    <p-content>
      <div>
        <p-button inset size="sm" @click="randomize">
          <p-icon icon="SwitchHorizontalIcon" class="w-3 h-3" />
          Randomize data
        </p-button>
      </div>

      <JsonEditor v-model="jsonRef" />

      <p-divider />

      Raw:
      <p-code multiline>
        {{ jsonRef }}
      </p-code>
    </p-content>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import JsonEditor from '@/components/JsonEditor.vue'
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
  ]

  const randomize = (): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    jsonRef.value = JSON.stringify(mocker.create(choice(choices)))
  }
</script>