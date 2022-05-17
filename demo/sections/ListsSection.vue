<template>
  <Section heading="Lists">
    <SubSection heading="Flow List">
      <div class="grid gap-2">
        <template v-for="flow in flows" :key="flow.id">
          <FlowListItemInput v-model:selected="selected" :flow="flow" />
        </template>
      </div>
    </SubSection>
    <SubSection heading="Flow Run List" class="mt-auto">
      <div class="grid gap-2">
        <template v-for="flowRun in flowRuns" :key="flowRun.id">
          <FlowRunListItemInput v-model:selected="selected" :value="flowRun.id" :flow-run="flowRun" />
        </template>
      </div>
    </SubSection>

    {{ selected }}
  </Section>
</template>

<script lang="ts" setup>
  import { ref } from '@vue/reactivity'
  import Section from '../components/section.vue'
  import SubSection from '../components/subSection.vue'
  import FlowListItemInput from '@/components/FlowListItemInput.vue'
  import FlowRunListItemInput from '@/components/FlowRunListItemInput.vue'
  import { mocker } from '@/services'

  const selected = ref<number[]>([1])
  const flows = mocker.createMany('flow', 3)
  const flowRuns = mocker.createMany('flowRun', 3)
</script>

<style></style>