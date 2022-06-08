<template>
  <DemoSection heading="Marketing Banner">
    <DemoSubSection heading="Default" class="mt-auto">
      <CodeBanner :command="workspaceCliCommand" title="Workspace is ready to go!" subtitle="Sync flows into your workspace with this CLI command." />
      <MarketingBanner title="Orchestrate Happiness." class="mb-3" />
      <MarketingBanner title="Ready to upgrade?" subtitle="Annual plans, more workspaces, more collaborators, enterprise support." class="mb-3">
        <template #actions>
          <p-button inset>
            Lets go
          </p-button>
        </template>
      </MarketingBanner>
    </DemoSubSection>

    <DemoSubSection heading="Alternate" class="mt-auto">
      <MarketingBanner title="Ready to upgrade?" subtitle="Annual plans, more workspaces, more collaborators, enterprise support." alternate class="mb-3">
        <template #actions>
          <p-button inset>
            Lets go
          </p-button>
        </template>
      </MarketingBanner>
      <MarketingBanner alternate>
        <div class="flex flex-col items-center">
          <img src="https://d33wubrfki0l68.cloudfront.net/504beb80ec8dfc980a28612dd72249b413897927/b8655/assets/img/prefect-logo-gradient-navy.0cb04f87.svg" width="250">
          Orchestrate Happiness.
        </div>
        <template #actions>
          <p-button>
            Talk to sales
          </p-button>
          <p-button secondary>
            View Documentation
          </p-button>
        </template>
      </MarketingBanner>
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import CodeBanner from '@/components/CodeBanner.vue'
  import MarketingBanner from '@/components/MarketingBanner.vue'

  const workspaceCliCommand = 'prefect config set PREFECT_API_URL="..."'
</script>