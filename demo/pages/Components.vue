<template>
  <p-layout-default>
    <FlowRunsFilterSection />
    <BlockSchemaCapabilitiesSection />
    <BlockTypesSection />
    <ColorModesSection />
    <ComboboxesSection />
    <EmptyStateSection />
    <ListsSection />
    <LogSection />
    <MarketingBannerSection />
    <MetaWellSection />
    <NotificationsSection />
    <PageHeadingsSection />
    <RunMenuSection />
    <ScheduleDisplaySection />
    <ScheduleModalSection />
    <SearchesSection />
    <SortSections />
    <StatesSection />
    <ToggleSection />
  </p-layout-default>
</template>

<script lang="ts" setup>
  import { PLayoutDefault } from '@prefecthq/prefect-design'
  import BlockSchemaCapabilitiesSection from '../sections/BlockSchemaCapabilitiesSection.vue'
  import BlockTypesSection from '../sections/BlockTypesSection.vue'
  import ColorModesSection from '../sections/ColorModesSection.vue'
  import ComboboxesSection from '../sections/ComboboxesSection.vue'
  import EmptyStateSection from '../sections/EmptyStateSection.vue'
  import FlowRunsFilterSection from '../sections/FlowRunsFilterSection.vue'
  import ListsSection from '../sections/ListsSection.vue'
  import LogSection from '../sections/LogsSection.vue'
  import MarketingBannerSection from '../sections/MarketingBannerSection.vue'
  import MetaWellSection from '../sections/MetaWellSection.vue'
  import NotificationsSection from '../sections/NotificationsSection.vue'
  import PageHeadingsSection from '../sections/PageHeadingsSection.vue'
  import RunMenuSection from '../sections/RunMenuSection.vue'
  import ScheduleDisplaySection from '../sections/ScheduleDisplaySection.vue'
  import ScheduleModalSection from '../sections/ScheduleModalSection.vue'
  import SearchesSection from '../sections/SearchesSection.vue'
  import SortSections from '../sections/SortSections.vue'
  import StatesSection from '../sections/StatesSection.vue'
  import ToggleSection from '../sections/ToggleSection.vue'
</script>