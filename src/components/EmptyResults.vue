<template>
  <div class="empty-list">
    <div class="empty-list--message">
      <slot name="message">
        No runs
      </slot>
    </div>
    <slot name="actions" />
  </div>
</template>

<style>
.empty-list {
  @apply text-center text-base
}
.empty-list--message {
  @apply text-slate-500
}
</style>
