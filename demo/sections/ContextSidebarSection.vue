<template>
  <Section heading="Context Sidebar">
    <div class="bg-slate-300 h-96">
      <ContextSidebar class="sm:h-full sm:w-64 w-full">
        <template #header>
          <div class="flex flex-col my-3">
            <span class="font-normal text-sm mx-3">Prefect Design</span>
            <span class="font-bold text-base mx-3">UI Team Demo Collection</span>
          </div>
          <hr class="border-none sm:h-[1px] sm:bg-slate-600 sm:my-1 sm:-mx-3 h-0">
        </template>
      </ContextSidebar>
    </div>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../components/section.vue'
  import ContextSidebar from '@/components/ContextSidebar.vue'
</script>