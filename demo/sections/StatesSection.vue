<template>
  <Section heading="States">
    <SubSection heading="Icons">
      <div class="flex gap-1 flex-wrap">
        <template v-for="state in stateType" :key="state">
          <StateIcon :state-type="state" class="w-10 h-10" />
        </template>
      </div>
    </SubSection>
    <SubSection heading="Badges">
      <div class="flex gap-2 flex-wrap mb-3">
        <template v-for="state in states" :key="state">
          <StateBadge :state="state" />
        </template>
      </div>
    </SubSection>
    <SubSection heading="Badges - Flat">
      <div class="flex gap-2 flex-wrap mb-3">
        <template v-for="state in states" :key="state">
          <StateBadge :state="state" flat />
        </template>
      </div>
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../components/section.vue'
  import SubSection from '../components/subSection.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import StateIcon from '@/components/StateIcon.vue'
  import { IState } from '@/models'
  import { stateType } from '@/models/StateType'
  import { mocker } from '@/services'

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
</script>

<style></style>