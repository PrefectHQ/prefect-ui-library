<template>
  <a :href="to" class="documentation-button" target="_blank">
    <p-button icon-append="ArrowTopRightOnSquareIcon">
      <slot>
        View Docs
      </slot>
    </p-button>
  </a>
</template>

<script lang="ts" setup>
  defineProps<{
    to: string,
  }>()
</script>