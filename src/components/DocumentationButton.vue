<template>
  <p-button :to class="documentation-button" target="_blank" icon-append="ArrowTopRightOnSquareIcon">
    <slot>
      View Docs
    </slot>
  </p-button>
</template>

<script lang="ts" setup>
  defineProps<{
    to: string,
  }>()
</script>