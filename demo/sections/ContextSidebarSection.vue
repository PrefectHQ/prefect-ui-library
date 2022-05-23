<template>
  <DemoSection heading="Context Sidebar">
    <div class="bg-slate-300 h-96">
      <ContextSidebar class="sm:h-full sm:w-64 w-full">
        <template #header>
          <p class="font-normal text-sm mx-3">
            Prefect Design
          </p>
          <p class="font-bold text-base mx-3">
            UI Team Demo Collection
          </p>
        </template>
      </ContextSidebar>
    </div>
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import ContextSidebar from '@/components/ContextSidebar.vue'
</script>