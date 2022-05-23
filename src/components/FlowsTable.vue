<template>
  <p-table :data="flows" class="flows-table">
    <p-table-head>
      <template #row>
        <p-table-header>
          Name
        </p-table-header>

        <p-table-header class="flows-table__cell">
          Activity
        </p-table-header>

        <p-table-header class="flows-table__cell">
          Tags
        </p-table-header>

        <p-table-header class="flows-table__cell">
          <span class="sr-only"> Actions</span>
        </p-table-header>
      </template>
    </p-table-head>

    <p-table-body :data="flows">
      <template #row="{ row }">
        <p-table-data>
          {{ row.name }}
          <dl class="flows-table__mobile-cell">
            <dt>
              <!-- Activity -->
              Activity
            </dt>
            <dt>
              <p-tag-wrapper :tags="row.tags" justify="left" />
            </dt>
          </dl>
        </p-table-data>

        <p-table-data class="flows-table__cell">
          <!-- Activity -->
        </p-table-data>

        <p-table-data class="flows-table__cell">
          <p-tag-wrapper :tags="row.tags" justify="left" />
        </p-table-data>

        <p-table-data>
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

<style>
  .flows-table__cell {
    @apply
    hidden
    sm:table-cell
  }

  .flows-table__mobile-cell {
    @apply
     sm:hidden
  }
</style>