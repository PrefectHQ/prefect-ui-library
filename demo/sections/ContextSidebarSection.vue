<template>
  <DemoSection heading="Context Sidebar">
    <div class="bg-slate-300 h-[400px] relative">
      <ContextSidebar class="absolute top-0 right-0 left-0 max-w-full bottom-0 h-auto z-0">
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