<template>
  <HelpIconModal title="Priority" icon="QuestionMarkCircleIcon">
    Priority specifies how Prefect prioritizes the delivery of work — more precisely, execution of flow runs among worker pools. Priority must be a unique, positive integer. Lower numbers indicate higher pool priorities. For example, 1 is the highest priority queue and its flow run execution takes precedence over any lower-priority pool. 10 is a lower priority queue than 1, and 100 is lower priority than both 1 and 10. If you specify a priority that already exists, the new priority supersedes any previously set priority on a worker pool.
  </HelpIconModal>
</template>

<script lang="ts" setup>
  import { HelpIconModal } from '@/components'
</script>