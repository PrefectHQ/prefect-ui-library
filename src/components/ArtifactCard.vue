<template>
  <p-card class="artifact-card" :class="classes.root">
    <div class="artifact-card__body" :class="classes.body">
      <header class="artifact-card__header" :class="classes.header">
        <div class="artifact-card__subheader" :class="classes.subheader">
          {{ artifact.type }}
        </div>
        <div v-if="hasKey" class="artifact-card__title">
          {{ artifact.key }}
        </div>
      </header>

      <slot>
        <div class="artifact-card__summary-container" :class="classes.summaryContainer">
          <div class="artifact-card__summary-item">
            <span class="artifact-card__summary-item-label">
              <slot name="summary-label">
                {{ localization.info.created }}
              </slot>
            </span>
            <span class="artifact-card__summary-item-value">
              <slot name="summary-value">
                {{ formatDateTime(artifact.created) }}
              </slot>
            </span>
          </div>
        </div>
      </slot>
    </div>

    <div class="artifact-card__description-container">
      <slot name="description">
        <p-markdown-renderer v-if="firstLineOfDescription" :text="firstLineOfDescription" class="artifact-card__description" />
        <p v-else class="artifact-card__description-empty">
          {{ localization.info.noDescription }}
        </p>
      </slot>
    </div>
  </p-card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { localization } from '@/localization'
  import { Artifact } from '@/models'
  import { formatDateTime } from '@/utilities'

  const props = defineProps<{
    artifact: Artifact,
    condense?: boolean,
    interactive?: boolean,
  }>()

  const hasKey = computed(() => !!props.artifact.key)

  const classes = computed(() => {
    return {
      root: {
        'artifact-card--condensed': props.condense,
        'artifact-card--interactive': props.interactive,
      },
      body: {
        'artifact-card__body--condensed': props.condense,
      },
      header: {
        'artifact-card__header--condensed': props.condense,
      },
      subheader: {
        'artifact-card__subheader--condensed': props.condense,
      },
      summaryContainer: {
        'artifact-card__summary-container--condensed': props.condense,
      },
    }
  })

  const leadingHashes = /^#+/
  const firstLineOfDescription = computed(() => {
    if (!props.artifact.description) {
      return null
    }

    const lines = props.artifact.description.trim().split('\n')
    return lines[0].replace(leadingHashes, '').trim()
  })
</script>

<style>
.artifact-card { @apply
  flex
  flex-col
  gap-y-2
  text-base
  transition-all;
  transition-property: box-shadow;
  box-shadow: inset 0 0 0 theme('space[0.5]') transparent;
}

.artifact-card--condensed { @apply
  text-sm
  p-4
}

.artifact-card--interactive:hover,
.artifact-card--interactive:focus { @apply
  cursor-pointer;
  box-shadow: inset 0 0 0 theme('space[0.5]') var(--p-color-text-link);
}

.artifact-card__body { @apply
  flex
  flex-col
  gap-y-2
}

.artifact-card__body--condensed { @apply
  flex-col
  sm:flex-row
  gap-x-2
  gap-y-0
  items-start
  sm:items-start
  sm:justify-between
}

.artifact-card__header { @apply
  text-2xl
  font-bold
}

.artifact-card__header--condensed { @apply
  text-lg
  font-bold
}

.artifact-card__subheader { @apply
  text-sm
  text-subdued
  uppercase
}

.artifact-card__subheader--condensed { @apply
  text-xs
  text-subdued
  uppercase
}

.artifact-card__summary-container { @apply
  flex
  flex-col
  gap-y-2
}

.artifact-card__summary-container--condensed { @apply
  gap-y-0
  justify-center
  self-stretch
  sm:self-auto
  sm:whitespace-nowrap
}

.artifact-card__summary-item { @apply
  flex
  justify-between
  flex-col
  gap-x-4
  sm:flex-row-reverse
  items-baseline
  text-sm
  pb-1
}

.artifact-card__summary-container--condensed .artifact-card__summary-item { @apply
  border-b-0
  pb-0
  gap-x-2
  sm:flex-col
  flex-row
  justify-self-stretch
  sm:justify-end
  sm:items-end
  items-center
}

.artifact-card__summary-item-value { @apply
  shrink
  whitespace-nowrap
  overflow-hidden
  overflow-ellipsis
}

.artifact-card__summary-item-label { @apply
  text-sm
  text-subdued
  capitalize
  whitespace-nowrap
}

.artifact-card__summary-container--condensed .artifact-card__summary-item-label { @apply
  sm:text-xs
}

.artifact-card__summary-item-value--none { @apply
  text-sm
  text-subdued
  italic
}

.artifact-card__description-container { @apply
  border-t
  border-t-divider
  pt-1
}

.artifact-card__description { @apply
  text-sm
  text-subdued
}

.artifact-card__description > * { @apply
  whitespace-nowrap
  overflow-hidden
  overflow-ellipsis
}

.artifact-card__description-empty { @apply
  italic
  text-subdued
  text-sm
}
</style>