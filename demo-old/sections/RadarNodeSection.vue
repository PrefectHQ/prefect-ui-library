<template>
  <Section heading="Radar Nodes">
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
          Footer Leading
        </template>

        <template #footer-trailing>
          Footer Trailing
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
      <RadarNodeTaskRun :graph-node="taskRun" :collapsed="collapsedMap" :downstream-nodes="20" :toggle="toggleCollapsed" />
    </SubSection>

    <SubSection heading="Flow run">
      <RadarNodeFlowRun :graph-node="flowRun" :collapsed="collapsedMap" :downstream-nodes="0" :toggle="toggleCollapsed" />
    </SubSection>

    <SubSection heading="Subflow run">
      <RadarNodeSubFlowRun :graph-node="flowRun" :collapsed="collapsedMap" :downstream-nodes="20" :toggle="toggleCollapsed" />
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
  import RadarNodeFlowRun from '@/components/RadarNodeFlowRun.vue'
  import RadarNodeSubFlowRun from '@/components/RadarNodeSubFlowRun.vue'
  import RadarNodeTaskRun from '@/components/RadarNodeTaskRun.vue'
  import { mocker } from '@/services/Mocker'

  const taskRun = mocker.create('graphNode')
  const flowRun = mocker.create('graphNode')

  const newRadarNode = (id: string): RadarNode => {
    return { id, cx: 0, cy: 0, radian: 0, data: taskRun, downstreamNodes: new Map(), upstreamNodes: new Map(), ringId: 0 }
  }

  const newCollapsedMap = (): Map<string, RadarNode> => {
    return new Map(Array.from({ length: 20 }, () => {
      const taskRun = mocker.create('graphNode')
      return [taskRun.id, newRadarNode(taskRun.id)]
    }))
  }

  const collapsedMap = ref(newCollapsedMap())

  const toggleCollapsed = (): void => {
    if (collapsedMap.value.size > 0) {
      collapsedMap.value = new Map()
    } else {
      collapsedMap.value = newCollapsedMap()
    }
  }
</script>