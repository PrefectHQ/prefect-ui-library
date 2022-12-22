<template>
  <ComponentPage title="OTable">
    <OTable :data="[]" :columns="[]" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { OTable } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { mocker } from '@/services'
</script>