<template>
  <p-layout-default>
    <ColorModesSection />
    <PageHeadingsSection />
    <MarketingBannerSection />
    <StatesSection />
    <LogSection />
    <EmptyStateSection />
    <ListsSection />
    <ToggleSection />
    <MetaWellSection />
    <SearchesSection />
    <SortSections />
    <ComboboxesSection />
    <ScheduleModalSection />
    <ScheduleDisplaySection />
    <RunButtonSection />
    <NotificationsSection />
  </p-layout-default>
</template>

<script lang="ts" setup>
  import { PLayoutDefault } from '@prefecthq/prefect-design'
  import ColorModesSection from '../sections/ColorModesSection.vue'
  import ComboboxesSection from '../sections/ComboboxesSection.vue'
  import EmptyStateSection from '../sections/EmptyStateSection.vue'
  import ListsSection from '../sections/ListsSection.vue'
  import LogSection from '../sections/LogsSection.vue'
  import MarketingBannerSection from '../sections/MarketingBannerSection.vue'
  import MetaWellSection from '../sections/MetaWellSection.vue'
  import NotificationsSection from '../sections/NotificationsSection.vue'
  import PageHeadingsSection from '../sections/PageHeadingsSection.vue'
  import RunButtonSection from '../sections/RunButtonSection.vue'
  import ScheduleDisplaySection from '../sections/ScheduleDisplaySection.vue'
  import ScheduleModalSection from '../sections/ScheduleModalSection.vue'
  import SearchesSection from '../sections/SearchesSection.vue'
  import SortSections from '../sections/SortSections.vue'
  import StatesSection from '../sections/StatesSection.vue'
  import ToggleSection from '../sections/ToggleSection.vue'
</script>