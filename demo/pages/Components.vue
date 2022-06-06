<template>
  <p-layout-default>
    <PageHeadingsSection />
    <MarketingBannerSection />
    <StatesSection />
    <LogSection />
    <EmptyStateSection />
    <ContextSidebarSection />
    <ListsSection />
    <TablesSection />
    <ToggleSection />
    <MetaWellSection />
    <SearchesSection />
    <SortSections />
    <ComboboxesSection />
    <WorkQueueFormSection />
    <RunButtonSection />
  </p-layout-default>
</template>

<script lang="ts" setup>
  import { PLayoutDefault } from '@prefecthq/prefect-design'
  import ComboboxesSection from '../sections/ComboboxesSection.vue'
  import ContextSidebarSection from '../sections/ContextSidebarSection.vue'
  import EmptyStateSection from '../sections/EmptyStateSection.vue'
  import ListsSection from '../sections/ListsSection.vue'
  import LogSection from '../sections/LogsSection.vue'
  import MarketingBannerSection from '../sections/MarketingBannerSection.vue'
  import MetaWellSection from '../sections/MetaWellSection.vue'
  import PageHeadingsSection from '../sections/PageHeadingsSection.vue'
  import RunButtonSection from '../sections/RunButtonSection.vue'
  import SearchesSection from '../sections/SearchesSection.vue'
  import SortSections from '../sections/SortSections.vue'
  import StatesSection from '../sections/StatesSection.vue'
  import TablesSection from '../sections/TablesSection.vue'
  import ToggleSection from '../sections/ToggleSection.vue'
  import WorkQueueFormSection from '../sections/WorkQueueFormSection.vue'
</script>