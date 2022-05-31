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
              <a
                v-if="downstreamNodes && downstreamNodes > 0"
                class="radar-node__collapse-link"
                tabindex="-1"
                @click.stop="toggle"
              >
                {{ collapsed ? 'Show' : 'Hide' }}
              </a>
            </slot>
          </div>
        </slot>
      </div>
    </div>
    <transition name="scale" mode="out-in">
      <div v-if="collapsed" class="radar-node__collapsed-badge">
        {{ collapsed.size.toLocaleString() }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
  import { RadarNode } from '@prefecthq/radar'

  defineProps<{
    node?: RadarNode,
    downstreamNodes?: number,
    toggle?: () => void,
    highlightNode?: () => void,
    selectNode?: () => void,
    panToNode?: () => void,
    collapsed?: Map<string, Node>,
  }>()
</script>

<style>
.radar-node {
  @apply
  px-4
  py-2
  shadow
}
</style>