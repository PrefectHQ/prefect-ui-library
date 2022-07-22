<template>
  <p-list-item-input v-model:selected="model" :value="value" class="state-list-item" :class="classes" disabled>
    <div class="state-list-item__content">
      <div class="state-list-item__name">
        <slot name="name" />
      </div>
      <div class="state-list-item__meta">
        <slot name="meta" />
      </div>
      <div class="state-list-item__tags">
        <slot name="tags">
          <p-tag-wrapper class="task-run-list-item-input__tags" v-bind="{ tags, justify }" />
        </slot>
      </div>
    </div>
  </p-list-item-input>
</template>

<script lang="ts" setup>
  import { PListItemInput, CheckboxModel, media } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { StateType } from '@/models/StateType'

  const props = defineProps<{
    selected: CheckboxModel | null,
    value: unknown,
    stateType: StateType | null | undefined,
    tags?: string[] | null,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: CheckboxModel): void,
  }>()

  const model = computed({
    get() {
      return props.selected ?? undefined
    },
    set(value: CheckboxModel) {
      emit('update:selected', value)
    },
  })

  const classes = computed(() => `state-list-item--${props.stateType ?? 'unknown'}`)
  const justify = computed(() => media.md ? 'right' : 'left')
  const tags = computed(() => props.tags ?? [])
</script>

<style>
.state-list-item--completed .list-item-input__checkbox { @apply
  bg-state-completed-500
}

.state-list-item--running .list-item-input__checkbox { @apply
  bg-state-running-500
}

.state-list-item--scheduled .list-item-input__checkbox { @apply
  bg-state-scheduled-500
}

.state-list-item--pending .list-item-input__checkbox { @apply
  bg-state-pending-500
}

.state-list-item--failed .list-item-input__checkbox { @apply
  bg-state-failed-500
}

.state-list-item--cancelled .list-item-input__checkbox { @apply
  bg-state-cancelled-500
}

.state-list-item--crashed .list-item-input__checkbox { @apply
  bg-state-crashed-500
}

.state-list-item__content { @apply
  grid
  gap-x-4
  gap-y-2
}

.state-list-item__content {
  grid-template-areas: 'name'
                       'meta'
                       'tags';
}

@screen sm {
  .state-list-item__content {
    grid-template-columns: min-content 1fr;
    grid-template-areas: 'name tags'
                         'meta meta';
  }
}

.state-list-item__name { @apply
 text-base
 text-slate-700
 shrink-0
 whitespace-nowrap
 grow-0
 text-ellipsis
 overflow-hidden
}

.state-list-item__meta { @apply
  flex
  flex-col
  items-start
  gap-2
  whitespace-nowrap
  mr-1
}

@media screen and (min-width: 768px) {
  .state-list-item__meta { @apply
    items-center
    flex-wrap
    flex-row
  }
}

.state-list-item__tags { @apply
  place-self-end
  min-w-0
  w-full
  grow
}

.state-list-item__name {
  grid-area: name;
}

.state-list-item__meta {
  grid-area: meta;
}

.state-list-item__tags {
  grid-area: tags;
}
</style>