<template>
  <component
    :is="component"
    v-model:selected="model"
    :value="value"
    class="state-list-item"
    :class="classes"
  >
    <div class="state-list-item__content-container">
      <div class="state-list-item__content">
        <div class="state-list-item__top-section">
          <div class="state-list-item__name">
            <slot name="name" />
          </div>

          <div class="state-list-item__tags">
            <slot name="tags">
              <p-tag-wrapper v-bind="{ tags, justify }" />
            </slot>
          </div>

          <template v-if="$slots.action">
            <div class="state-list-item__action">
              <slot name="action" />
            </div>
          </template>
        </div>
        <div v-if="$slots.meta" class="state-list-item__meta">
          <slot name="meta" />
        </div>
        <template v-if="$slots.relationships">
          <div class="state-list-item__relationships">
            <slot name="relationships" />
          </div>
        </template>
      </div>
    </div>

    <slot />
  </component>
</template>

<script lang="ts" setup>
  import { PListItemInput, CheckboxModel, media, PListItem } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { StateType } from '@/models/StateType'

  const props = defineProps<{
    selectable?: boolean,
    selected?: CheckboxModel | null,
    value?: unknown,
    stateType?: StateType | null | undefined,
    tags?: string[] | null,
  }>()

  const component = computed(() => {
    if (props.selectable) {
      return PListItemInput
    }

    return PListItem
  })

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
.state-list-item { @apply
  border-l-8
  border-transparent
}

.state-list-item--completed { @apply
  border-state-completed-500
}

.state-list-item--running { @apply
  border-state-running-500
}

.state-list-item--scheduled { @apply
  border-state-scheduled-500
}

.state-list-item--pending { @apply
  border-state-pending-500
}

.state-list-item--paused { @apply
  border-state-paused-500
}

.state-list-item--failed { @apply
  border-state-failed-500
}

.state-list-item--cancelled { @apply
  border-state-cancelled-500
}

.state-list-item--crashed { @apply
  border-state-crashed-500
}

.state-list-item__content { @apply
  flex
  flex-col
  gap-2
  items-start
  grow
}

.state-list-item__content-container { @apply
  flex
}

.state-list-item__top-section { @apply
  grid
  w-full
  items-start
  gap-2;

  grid-template-columns: 1fr auto;
  grid-template-areas:
    "name action"
    "tags tags";
}

@screen md {
  .state-list-item__top-section {
    grid-template-columns: auto 1fr auto;
    grid-template-areas:
     "name tags action";
  }
}

.state-list-item__name { @apply
  text-base
  text-subdued;

  grid-area: name;
}

.state-list-item__meta { @apply
  flex
  flex-col
  items-start
  gap-2
  whitespace-nowrap
  mr-1
  md:flex-row
  md:flex-wrap
  md:items-center
  w-full
}

.state-list-item__tags { @apply
  min-w-12
  grow;

  grid-area: tags;
}

.state-list-item__action {
  grid-area: action;
}

.state-list-item__relationships { @apply
  flex
  flex-col
  items-start
  text-xs
  font-medium
  gap-2
  whitespace-nowrap
  mr-1
  self-stretch
  md:items-center
  md:flex-wrap
  md:flex-row
  md:gap-4
}
</style>