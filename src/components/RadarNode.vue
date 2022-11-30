<template>
  <div
    class="radar-node"
    tabindex="0"
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
                {{ collapsed && collapsed.size > 0 ? 'Expand' : 'Collapse' }}
              </p-link>
            </slot>
          </div>
        </slot>
      </div>
    </div>

    <transition name="radar-node__scale" mode="out-in">
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
  import { computed, withDefaults } from 'vue'

  const props = withDefaults(defineProps<{
    collapsed?: Map<string, RadarNode>,
    downstreamNodes?: number,
    highlightNode?: () => void,
    panToNode?: () => void,
    selectNode?: () => void,
    toggle?: () => void,
  }>(), {
    collapsed: undefined,
    downstreamNodes: 0,
    highlightNode: (): void => {
    //
    },
    panToNode: (): void => {
    //
    },
    selectNode: (): void => {
    //
    },
    toggle: (): void => {
    //
    },
  })


  const showCollapsedBadge = computed(() => props.collapsed?.size && props.collapsed.size > 0)
</script>

<style>
.radar-node {
  @apply
  shadow
  bg-white
  hover:shadow-md
  focus:bg-slate-50
  focus:outline
  flex
  relative
  rounded
}

.radar-node__content {
  @apply
  grow
  flex
  flex-col
  justify-between
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

.radar-node__collapse-link {
  @apply
  text-xs
}

.radar-node__collapsed-badge {
  @apply
  absolute
  right-0
  top-0;

  transform: translate(50%, -50%) scale(1);
}

.radar-node__scale-enter-active,
.radar-node__scale-leave-active {
  transition: transform 150ms ease;
}

.radar-node__scale-enter-from,
.radar-node__scale-leave-to {
  transform: translate(50%, -50%) scale(0);
}
</style>