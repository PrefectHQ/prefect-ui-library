<template>
  <ComponentPage title="MarketingBanner" :demos="demos">
    <MarketingBanner title="Stop wondering about your workflows" subtitle="Take control of your code with Prefect's workflow orchestration platform">
      <template #actions>
        <p-button primary>
          Create free account
        </p-button>
      </template>
    </MarketingBanner>

    <template #alternate>
      <MarketingBanner alternate title="Stop wondering about your workflows" subtitle="Take control of your code with Prefect's workflow orchestration platform">
        <template #actions>
          <p-button primary>
            Create free account
          </p-button>
        </template>
      </MarketingBanner>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import MarketingBanner from '@/components/MarketingBanner.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [{ title: 'Alternate' }]
</script>