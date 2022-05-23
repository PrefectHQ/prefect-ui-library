<template>
  <p-table :data="flows">
    <p-table-head>
      <template #row>
        <p-table-header>
          Name
        </p-table-header>

        <p-table-header class="hidden sm:table-cell">
          Activity
        </p-table-header>

        <p-table-header class="hidden sm:table-cell">
          Tags
        </p-table-header>

        <p-table-header class="hidden sm:table-cell">
          <span class="sr-only"> Actions</span>
        </p-table-header>
      </template>
    </p-table-head>

    <p-table-body :data="flows">
      <template #row="{ row }">
        <p-table-data>
          {{ row.name }}
          <dl class="sm:hidden">
            <dt>
              <!-- Activity -->
              Activity
            </dt>
            <dt>
              <p-tag-wrapper class="h-[48px]" :tags="row.tags" justify="left" />
            </dt>
          </dl>
        </p-table-data>

        <p-table-data class="hidden sm:table-cell">
          <!-- Activity -->
        </p-table-data>

        <p-table-data class="hidden sm:table-cell">
          <p-tag-wrapper class="h-[48px]" :tags="row.tags" justify="left" />
        </p-table-data>

        <p-table-data class="hidden sm:table-cell">
          <!-- Actions -->
          <slot name="actions" />
        </p-table-data>
      </template>
    </p-table-body>
  </p-table>
</template>

<script lang="ts" setup>
  import { PTable, PTableData } from '@prefecthq/prefect-design'
  import { Flow } from '@/models'

  defineProps<{
    flows: Flow[],
  }>()
</script>