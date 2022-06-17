<template>
  <p-form>
    <div class="interval-schedule-form__row">
      <p-label label="Value" class="interval-schedule-form__column--span-3">
        <p-number-input v-model="intervalValue" />
      </p-label>

      <p-label label="Interval">
        <p-select v-model="intervalOption" :options="intervalOptions" />
      </p-label>
    </div>

    <div class="interval-schedule-form__row">
      <p-label label="Anchor date" class="interval-schedule-form__column--span-2">
        <p-date-input v-model="anchorDateValue" show-time />
      </p-label>

      <p-label label="Timezone" class="interval-schedule-form__column--span-2">
        <TimezoneSelect v-model="intervalOption" />
      </p-label>
    </div>
  </p-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import TimezoneSelect from './TimezoneSelect.vue'

  const intervalValue = ref(0)
  const intervalOption = ref('Minutes')
  const anchorDateValue = ref(new Date())
  const intervalOptions = ['Seconds', 'Minutes', 'Hours', 'Days']
</script>

<style>
.interval-schedule-form__row {
  @apply
  grid
  gap-2
  grid-cols-4;
}

.interval-schedule-form__column--span-2 {
  @apply
  col-span-2
}

.interval-schedule-form__column--span-3 {
  @apply
  col-span-3
}
</style>