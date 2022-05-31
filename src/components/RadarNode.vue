<template>
  <div
    class="radar-node"
    @click.stop="selectNode"
    @mouseover="highlightNode"
    @mouseout="highlightNode"
    @focus.self="panToNode"
  >
    <aside
      class="radar-node__aside"
    >
      <slot name="aside" />
    </aside>

    <div
      class="radar-node__content"
    >
      <slot />

      <div class="radar-node__footer">
        <slot name="footer">
          <div class="radar-node__footer-leading">
            <slot name="footer-leading" />
          </div>

          <div class="radar-node__footer-trailing">
            <slot name="footer-trailing">
              <p-link
                v-if="downstreamNodes && downstreamNodes > 0"
                class="radar-node__collapse-link"
                tabindex="-1"
                role="button"
                @click.stop="toggle"
              >
                {{ collapsed ? 'Show' : 'Hide' }}
              </p-link>
            </slot>
          </div>
        </slot>
      </div>
    </div>

    <transition name="scale" mode="out-in">
      <div v-if="collapsed && showCollapsedBadge" class="radar-node__collapsed-badge">
        <slot name="collapsed-badge" :collapsed="collapsed">
          {{ collapsed.size.toLocaleString() }}
        </slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
  import { RadarNode } from '@prefecthq/radar'
  import { computed } from 'vue'

  const props = defineProps<{
    collapsed?: Map<string, RadarNode>,
    downstreamNodes?: number,
    highlightNode?: () => void,
    panToNode?: () => void,
    selectNode?: () => void,
    toggle?: () => void,
  }>()


  const showCollapsedBadge = computed(() => (props.collapsed?.size ?? 0) > 0)
</script>

<style>
.radar-node {
  @apply
  shadow
  flex
  relative
  rounded
}

.radar-node__content {
  @apply
  grow
  p-2
}

.radar-node__aside {
  @apply
  flex
  flex-col
  items-center
  justify-center
  shrink-0
}

.radar-node__footer {
  @apply
  flex
  justify-between
  items-center
}

.radar-node__footer-trailing {
  @apply
  text-sm
}

.radar-node__collapsed-badge {
  @apply
  absolute
  right-0
  top-0
  translate-x-1/2
  -translate-y-1/2
}
</style>