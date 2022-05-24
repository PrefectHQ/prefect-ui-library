<template>
  <p-layout-default>
    <PageHeadingsSection />
    <StatesSection />
    <LogSection />
    <EmptyStateSection />
    <ContextSidebarSection />
    <ListsSection />
    <TablesSection />
    <ToggleSection />
    <MetaWellSection />
    <SortSections />
    <ComboboxesSection />
  </p-layout-default>
</template>

<script lang="ts" setup>
  import { PLayoutDefault } from '@prefecthq/prefect-design'
  import ComboboxesSection from '../sections/ComboboxesSection.vue'
  import ContextSidebarSection from '../sections/ContextSidebarSection.vue'
  import EmptyStateSection from '../sections/EmptyStateSection.vue'
  import ListsSection from '../sections/ListsSection.vue'
  import LogSection from '../sections/LogsSection.vue'
  import MetaWellSection from '../sections/MetaWellSection.vue'
  import PageHeadingsSection from '../sections/PageHeadingsSection.vue'
  import SortSections from '../sections/SortSections.vue'
  import StatesSection from '../sections/StatesSection.vue'
  import TablesSection from '../sections/TablesSection.vue'
  import ToggleSection from '../sections/ToggleSection.vue'
</script>