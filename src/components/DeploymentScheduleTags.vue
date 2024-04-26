<template>
  <p-tag-wrapper small justify="right" class="deployment-schedule-tags">
    <template v-for="schedule in schedules" :key="schedule.id">
      <p-tooltip>
        <template #content>
          <span v-if="!schedule.active" class="deployment-schedule-tags__text--paused">
            (Paused)
          </span>
          {{ schedule.schedule.toString({ verbose: true }) }}
        </template>

        <p-tag class="deployment-schedule-tags__tag" :class="classes.tag(schedule)" small>
          {{ schedule.schedule }}
        </p-tag>
      </p-tooltip>
    </template>
  </p-tag-wrapper>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { DeploymentSchedule } from '@/models'

  defineProps<{
    schedules: DeploymentSchedule[],
  }>()

  const classes = computed(() => ({
    tag: (schedule: DeploymentSchedule) => ({
      'deployment-list__schedule--inactive': !schedule.active,
    }),
  }))
</script>

<style>
.deployment-schedule-tags { @apply
  flex
  flex-col
  gap-0.5
}

.deployment-schedule-tags__tag { @apply
  bg-sentiment-neutral
}

.deployment-schedule-tags__tag--inactive { @apply
  bg-opacity-50
}

.deployment-schedule-tags__text--paused { @apply
  text-subdued
  font-semibold
}
</style>