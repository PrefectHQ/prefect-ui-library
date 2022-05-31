<template>
  <Section heading="Radar">
    <SubSection heading="Base">
      <ORadarNode :collapsed="new Map([[taskRun.id, radarNode]])">
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
      <RadarNodeTaskRun :graph-node="taskRun" :collapsed="new Map([[taskRun.id, radarNode]])" :downstream-nodes="10" />
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import { PIcon } from '@prefecthq/prefect-design'
  import { RadarNode } from '@prefecthq/radar'
  import Section from '../components/DemoSection.vue'
  import SubSection from '../components/DemoSubSection.vue'
  import ORadarNode from '@/components/RadarNode.vue'
  import RadarNodeTaskRun from '@/components/RadarNodeTaskRun.vue'
  import { mocker } from '@/services/Mocker'

  const taskRun = mocker.create('graphNode')
  const radarNode: RadarNode = { id: taskRun.id, cx: 0, cy: 0, radian: 0, data: taskRun, downstreamNodes: new Map(), upstreamNodes: new Map(), ringId: 0 }
</script>

<style>
.flow-runs-scatter-plot {
  height: 400px;
}
</style>