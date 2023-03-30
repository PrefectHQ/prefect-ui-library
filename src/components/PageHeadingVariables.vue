<template>
  <page-heading class="page-heading-variables" :crumbs="crumbs">
    <template v-if="can.create.variable" #after-crumbs>
      <!-- Open VariableCreateModal -->
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import { useCan } from '@/compositions/useCan'

  const crumbs = [{ text: 'Variables' }]

  const can = useCan()
</script>