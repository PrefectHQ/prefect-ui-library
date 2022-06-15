<template>
  <DemoSection heading="States">
    <DemoSubSection heading="Icons">
      <div class="flex gap-1 flex-wrap">
        <template v-for="state in stateType" :key="state">
          <StateIcon :state-type="state" class="w-10 h-10" />
        </template>
      </div>
    </DemoSubSection>
    <DemoSubSection heading="Badges">
      <div class="flex gap-2 flex-wrap mb-3">
        <template v-for="state in states" :key="state">
          <StateBadge :state="state" />
        </template>
      </div>
    </DemoSubSection>
    <DemoSubSection heading="Badges with custom name mapper">
      <div class="flex gap-2 flex-wrap mb-3">
        <template v-for="state in customState" :key="state">
          <StateBadge :state="state" />
        </template>
      </div>
    </DemoSubSection>
    <DemoSubSection heading="Badges - Flat">
      <div class="flex gap-2 flex-wrap mb-3">
        <template v-for="state in states" :key="state">
          <StateBadge :state="state" flat />
        </template>
      </div>
    </DemoSubSection>
    <DemoSubSection heading="Badges - Select">
      <StateSelect v-model:selected="selected" empty-message="All Tags" />
      {{ JSON.stringify(selected) }}
      <p-checkbox v-model="multiple" label="Multiple" @update:model-value="clearSelectedStates" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { PCheckbox } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import StateIcon from '@/components/StateIcon.vue'
  import StateSelect from '@/components/StateSelect.vue'
  import { IState } from '@/models'
  import { StateType, stateType } from '@/models/StateType'
  import { mocker } from '@/services'
  import { mapStateNameToStateType } from '@/utilities'

  const states: (IState | null)[] = [
    mocker.create('state', [{ type: 'completed', name: 'Completed ' }]),
    mocker.create('state', [{ type: 'running', name: 'Running ' }]),
    mocker.create('state', [{ type: 'scheduled', name: 'Scheduled ' }]),
    mocker.create('state', [{ type: 'pending', name: 'Pending ' }]),
    mocker.create('state', [{ type: 'failed', name: 'Failed ' }]),
    mocker.create('state', [{ type: 'cancelled', name: 'Cancelled ' }]),
    mocker.create('state', [{ type: 'completed', name: 'Custom Name ' }]),
    null,
  ]

  const customState = [mapStateNameToStateType('completed'), mapStateNameToStateType('Failed'), mapStateNameToStateType('Custom Name') ]

  const selectedStateTypes = ref<StateType[]>([])
  const selectedStateType = ref<StateType | null>(null)
  const multiple = ref(true)

  const selected = computed({
    get() {
      return multiple.value ? selectedStateTypes.value : selectedStateType.value
    },
    set(value: StateType | null | StateType[]) {
      if (Array.isArray(value)) {
        selectedStateTypes.value = value
      } else {
        selectedStateType.value = value
      }
    },
  })

  function clearSelectedStates(): void {
    selectedStateType.value = null
    selectedStateTypes.value = []
  }
</script>

<style></style>