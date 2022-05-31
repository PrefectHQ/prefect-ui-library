<template>
  <Section heading="Radar">
    <p-button @click="toggleCollapsed">
      Toggle Collapsed
    </p-button>

    <SubSection heading="Base">
      <ORadarNode :collapsed="collapsedMap">
        <template #aside>
          <PIcon icon="TemplateIcon" />
          <div>
            Aside
          </div>
        </template>

        Main Content

        <template #footer-leading>
          Leading
        </template>

        <template #footer-trailing>
          Trailing
        </template>

        <template #collapsed-badge="{ collapsed }">
          <div class="text-xs text-center">
            Badge
            <br>
            {{ collapsed?.size }}
          </div>
        </template>
      </ORadarNode>
    </SubSection>

    <SubSection heading="Task run">
      <RadarNodeTaskRun :graph-node="taskRun" :collapsed="collapsedMap" :downstream-nodes="10" />
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import { PIcon } from '@prefecthq/prefect-design'
  import { RadarNode } from '@prefecthq/radar'
  import { ref } from 'vue'
  import Section from '../components/DemoSection.vue'
  import SubSection from '../components/DemoSubSection.vue'
  import ORadarNode from '@/components/RadarNode.vue'
  import RadarNodeTaskRun from '@/components/RadarNodeTaskRun.vue'
  import { mocker } from '@/services/Mocker'

  const taskRun = mocker.create('graphNode')
  const radarNode: RadarNode = { id: taskRun.id, cx: 0, cy: 0, radian: 0, data: taskRun, downstreamNodes: new Map(), upstreamNodes: new Map(), ringId: 0 }
  const collapsedMap = ref(new Map([[taskRun.id, radarNode]]))

  const toggleCollapsed = (): void => {
    if (collapsedMap.value.size > 0) {
      collapsedMap.value = new Map()
    } else {
      collapsedMap.value = new Map([[taskRun.id, radarNode]])
    }
  }
</script>

<style>
.flow-runs-scatter-plot {
  height: 400px;
}
</style>