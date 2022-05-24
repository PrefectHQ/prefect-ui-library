<template>
  <p-context-sidebar class="app-sidebar">
    <template #header>
      <div class="app-sidebar__header">
        <span class="app-sidebar__header-heading">Orion Design</span>

        <a class="app-sidebar__header-link" href="https://github.com/PrefectHQ/orion-design" target="_blank">
          <p-button size="sm">
            View on Github
          </p-button>
        </a>
      </div>
    </template>

    <p-context-nav-item title="Components" icon="PuzzleIcon" to="/components" />
  </p-context-sidebar>
</template>

<style>
.app-sidebar__header { @apply
  flex
  flex-col
  pt-3
  sm:pt-0;
}

.app-sidebar__header-heading { @apply
  font-normal
  text-sm;
}
</style>