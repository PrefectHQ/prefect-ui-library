<template>
  <div ref="stage" class="prefect-dag" />
</template>

<script lang="ts" setup>
  import FontFaceObserver from 'fontfaceobserver'
  import { Viewport } from 'pixi-viewport'
  import {
    Application,
    BitmapFont,
    BitmapText,
    Container,
    Graphics,
    IBitmapTextStyle,
    Ticker
  } from 'pixi.js'
  import { onMounted, ref } from 'vue'
  import {
    ModifiedGraphData,
    ModifiedGraphNode,
    TextStyles,
    Layers
  } from '@/models'

  const props = defineProps<{
    graphData: ModifiedGraphData,
    layers: Layers,
  }>()

  const stage = ref<HTMLDivElement>()
  const devicePixelRatio = window.devicePixelRatio || 2
  const fontSpriteKeys = [
    '0123456789',
    'abcdefghijklmnopqrstuvwxyz',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '.,:;!?()[]{}<>|/\\@\'"',
  ].join('')

  const styles = {
    defaultViewportPadding: 40,
    timelineGuidesXPadding: 1000,
  }

  let pixiApp: Application
  let viewport: Viewport
  let textStyles: TextStyles

  let minimumStartDate: Date
  let maximumEndDate: Date
  let overallTimeSpan: number
  let overallGraphWidth: number

  const timelineGuidesContainer = new Container()
  let timelineGuidesIdealCount = 10
  const timelineGuidesMinGap = 80
  const timelineGuidesMaxGap = 260
  let timelineGuidesCurrentTimeGap = 1000 * 30

  let nodes: Record<string, Container> = {}

  onMounted(() => {
    initTimeScale()
    initPixiApp()
    // init guides before viewport for proper z-indexing
    initTimelineGuidesContainer()
    initViewport()

    timelineGuidesIdealCount = stage.value
      ? Math.ceil(
        stage.value.clientWidth / (timelineGuidesMaxGap - timelineGuidesMinGap / 2),
      ) : 0
    setTimelineGuidesCurrentTimeGap()

    initBitmapFonts({ devicePixelRatio })
      .then(newTextStyles => {
        textStyles = newTextStyles
        initTimelineGuides()
        initContent()
      })
  })

  function initPixiApp(): void {
    if (!stage.value) {
      console.error('Stage reference not found in initPixiApp')
      return
    }

    pixiApp = new Application({
      backgroundAlpha: 0,
      width: stage.value.clientWidth,
      height: stage.value.clientWidth,
      resolution: devicePixelRatio,
      autoDensity: true,
      antialias: true,
    })

    stage.value.appendChild(pixiApp.view)
  }

  function initViewport(): void {
    if (!stage.value) {
      console.error('Stage reference not found in initViewport')
      return
    }

    const stageWidth = stage.value.clientWidth
    const stageHeight = stage.value.clientHeight

    viewport = new Viewport({
      screenWidth: stageWidth,
      screenHeight: stageHeight,
      passiveWheel: false,
      interaction: pixiApp.renderer.plugins.interaction,
      divWheel: stage.value,
      ticker: Ticker.shared,
    })

    viewport
      .drag({
        wheel: false,
        pressDrag: true,
      })
      .wheel({
        trackpadPinch: true,
        wheelZoom: false,
      })
      .clampZoom({
        minWidth: stageWidth / 2,
        maxWidth: stageWidth * 4,
      })
      .decelerate({
        friction: 0.9,
      })

    pixiApp.stage.addChild(viewport)
  }

  function initTimeScale(): void {
    const minimumTimeSpan = 1000 * 60

    const dates = Array
      .from(props.graphData)
      .filter(node => node.startTime && node.endTime)
      .flatMap(({
        startTime,
        endTime,
      }) => ({
        startTime,
        endTime,
      }))

    const { min, max } = getDateBounds(dates)

    minimumStartDate = min
    maximumEndDate = max

    const timeSpan = maximumEndDate.getTime() - minimumStartDate.getTime()
    overallTimeSpan = timeSpan < minimumTimeSpan ? minimumTimeSpan : timeSpan

    // @TODO: overallGraphWidth determine the overall width of the chart for layout purposes.
    //        Since our total time scale is unknown, determine a method for choosing a
    //        nice looking width of the graph.
    overallGraphWidth = stage.value?.clientWidth ? stage.value.clientWidth * 2 : 2000
  }

  function getDateBounds(
    datesArray: { startTime: Date | null, endTime: Date | null }[],
  ): { min: Date, max: Date } {
    let min: Date | undefined
    let max: Date | undefined

    datesArray.forEach((dates) => {
      if (
        dates.startTime !== null
        && (
          min === undefined
          || min > dates.startTime
          || isNaN(dates.startTime.getDate())
        )
      ) {
        min = dates.startTime
      }

      if (
        dates.endTime !== null
        && (
          max === undefined
          || max < dates.endTime
          || isNaN(dates.endTime.getDate())
        )
      ) {
        max = dates.endTime
      }
    })

    return {
      min: min ?? new Date(NaN),
      max: max ?? new Date(NaN),
    }
  }

  function initTimelineGuidesContainer(): void {
    pixiApp.stage.addChild(timelineGuidesContainer)
  }

  function initTimelineGuides(): void {
    pixiApp.ticker.add(() => {
      updateTimelineGuides()
    })
  }

  let timelineGuides: Record<string, Container> = {}
  let previousTimelineGuidesTimeGap: number = 0
  function updateTimelineGuides(): void {
    setTimelineGuidesCurrentTimeGap()

    if (previousTimelineGuidesTimeGap !== timelineGuidesCurrentTimeGap) {
      // rebuild
      if (Object.keys(timelineGuides).length > 0) {
        Object.keys(timelineGuides).forEach((key) => {
          timelineGuides[key].destroy()
        })
        timelineGuides = {}
      }
      createTimelineGuides()
      previousTimelineGuidesTimeGap = timelineGuidesCurrentTimeGap
    } else {
      updateTimelineGuidesPositions()
    }
  }

  function createTimelineGuides(): void {
    let lastGuidePoint
    const maxGuidePlacement = dateScale(overallGraphWidth + styles.timelineGuidesXPadding)
    const firstGuide = new Date(Math.ceil(dateScale(-styles.timelineGuidesXPadding) / timelineGuidesCurrentTimeGap) * timelineGuidesCurrentTimeGap)

    lastGuidePoint = firstGuide

    while (lastGuidePoint.getTime() < maxGuidePlacement) {
      const guide = createTimelineGuide(lastGuidePoint)

      timelineGuides[lastGuidePoint.getTime()] = guide

      timelineGuidesContainer.addChild(guide)

      lastGuidePoint = new Date(lastGuidePoint.getTime() + timelineGuidesCurrentTimeGap)
    }
  }

  function createTimelineGuide(date: Date): Container {
    const guide = new Container()
    guide.position.set(getGuidePosition(date), 0)

    const guideLine = new Graphics()
    guideLine.beginFill(0xc9d5e2)
    guideLine.drawRect(
      0,
      0,
      1,
      pixiApp.renderer.height,
    )
    guideLine.endFill()

    const guideLabel = new BitmapText(date.toLocaleTimeString(), textStyles.timeMarkerLabel)
    guideLabel.position.set(4, 4)

    guide.addChild(guideLine)
    guide.addChild(guideLabel)

    return guide
  }

  function updateTimelineGuidesPositions(): void {
    Object.keys(timelineGuides).forEach((key) => {
      const guide = timelineGuides[key]
      guide.position.set(getGuidePosition(new Date(Number(key))), 0)
    })
  }

  function getGuidePosition(date: Date): number {
    return xScale(date) * viewport.scale._x + viewport.worldTransform.tx
  }

  function setTimelineGuidesCurrentTimeGap(): void {
    const pxSpan = Math.ceil((viewport.right - viewport.left) / timelineGuidesIdealCount)
    const timeSpan = dateScale(pxSpan) - minimumStartDate.getTime()

    const time = {
      second: 1000,
      minute: 1000 * 60,
      hour: 1000 * 60 * 60,
      day: 1000 * 60 * 60 * 24,
      week: 1000 * 60 * 60 * 24 * 7,
    }
    const timeSpanSlots = [
      {
        ceiling: time.second * 4,
        span: time.second,
      }, {
        ceiling: time.second * 8,
        span: time.second * 5,
      }, {
        ceiling: time.second * 13,
        span: time.second * 10,
      }, {
        ceiling: time.second * 20,
        span: time.second * 15,
      }, {
        ceiling: time.second * 45,
        span: time.second * 30,
      }, {
        ceiling: time.minute * 4,
        span: time.minute,
      }, {
        ceiling: time.minute * 8,
        span: time.minute * 5,
      }, {
        ceiling: time.minute * 13,
        span: time.minute * 10,
      }, {
        ceiling: time.minute * 28,
        span: time.minute * 15,
      }, {
        ceiling: time.hour * 1.24,
        span: time.minute * 30,
      }, {
        ceiling: time.hour * 3,
        span: time.hour,
      }, {
        ceiling: time.hour * 8,
        span: time.hour * 5,
      }, {
        ceiling: time.hour * 13,
        span: time.hour * 10,
      }, {
        ceiling: time.hour * 22,
        span: time.hour * 12,
      }, {
        ceiling: time.day * 4,
        span: time.day,
      }, {
        ceiling: time.week * 2,
        span: time.week,
      }, {
        ceiling: Infinity,
        span: time.week * 4,
      },
    ]

    timelineGuidesCurrentTimeGap = timeSpanSlots.find(timeSlot => timeSlot.ceiling > timeSpan)?.span ?? timeSpanSlots[0].span
  }

  type InitBitmapFonts = {
    devicePixelRatio: number,
  }
  function initBitmapFonts({
    devicePixelRatio,
  }: InitBitmapFonts): Promise<TextStyles> {
    return new Promise((resolve) => {
      const font = new FontFaceObserver('InterVariable')

      font.load().then(() => {
        const options = {
          resolution: devicePixelRatio,
          chars: fontSpriteKeys,
        }
        BitmapFont.from(
          'NodeTextDefault',
          {
            fontFamily: 'InterVariable',
            fontSize: 24,
            lineHeight: 32,
            fill: 0x111827,
          }, options,
        )
        BitmapFont.from(
          'NodeTextInverse',
          {
            fontFamily: 'InterVariable',
            fontSize: 24,
            lineHeight: 32,
            fill: 0xffffff,
          }, options,
        )
        BitmapFont.from(
          'TimeMarkerLabel',
          {
            fontFamily: 'InterVariable',
            fontSize: 16,
            lineHeight: 24,
            fill: 0x94A3B8,
          }, options,
        )

        const nodeTextDefault: Partial<IBitmapTextStyle> = {
          fontName: 'NodeTextDefault',
          fontSize: 24,
        }

        const nodeTextInverse: Partial<IBitmapTextStyle> = {
          fontName: 'NodeTextInverse',
          fontSize: 24,
        }

        const timeMarkerLabel: Partial<IBitmapTextStyle> = {
          fontName: 'TimeMarkerLabel',
          fontSize: 12,
        }

        resolve({
          nodeTextDefault,
          nodeTextInverse,
          timeMarkerLabel,
        })
      })
    })
  }

  function initContent(): void {
    const nodesContainer = renderNodes()

    viewport.ensureVisible(
      nodesContainer.x - styles.defaultViewportPadding,
      nodesContainer.y - styles.defaultViewportPadding,
      nodesContainer.width + styles.defaultViewportPadding * 2,
      nodesContainer.height + styles.defaultViewportPadding * 2,
      true,
    )
    viewport.moveCenter(
      nodesContainer.x + nodesContainer.width / 2,
      nodesContainer.y + nodesContainer.height / 2,
    )
  }

  function renderNodes(): Container {
    const nodesContainer = new Container()

    props.graphData.forEach((node, nodeIndex) => {
      const { nodeContainer } = createNode({
        node,
        textStyles,
      })

      nodeContainer.position.set(
        node.startTime ? xScale(node.startTime) : 0,
        nodeIndex * 120,
      )

      nodes[node.id] = nodeContainer
      nodesContainer.addChild(nodeContainer)
    })

    viewport.addChild(nodesContainer)

    return nodesContainer
  }

  const stateColors = {
    'Completed': 0x00a63d,
    'Running': 0x00a8ef,
    'Scheduled': 0x60758d,
    'Pending': 0x60758d,
    'Failed': 0xf00011,
    'Cancelled': 0xf00011,
    'Crashed': 0xf00011,
    'Paused': 0xf4b000,
  }
  type CreateNodeProps = {
    node: ModifiedGraphNode,
    textStyles: TextStyles,
  }
  function createNode({
    node,
    textStyles,
  }: CreateNodeProps): Record<string, Container> {
    const nodeContainer = new Container()
    const stateFill = node.state?.name ? stateColors[node.state.name] : 0x9aa3b0

    const width = node.endTime && node.startTime ? xScale(node.endTime) - xScale(node.startTime) : 50
    let isLabelInBox = true

    let label = new BitmapText('Task', textStyles.nodeTextInverse)
    if (label.width >= width + 24 * 2) {
      isLabelInBox = false
      label.destroy()
      label = new BitmapText('Task', textStyles.nodeTextDefault)
    }

    label.position.set(
      isLabelInBox ? 24 : width + 4,
      24,
    )

    const box = new Graphics()
    box.beginFill(stateFill)
    box.drawRoundedRect(
      0,
      0,
      width,
      label.height + 24 * 2,
      12,
    )

    nodeContainer.addChild(box)
    nodeContainer.addChild(label)

    return {
      nodeContainer,
    }
  }

  // Convert a date to an X position
  function xScale(date: Date): number {
    return Math.ceil((date.getTime() - minimumStartDate.getTime()) * (overallGraphWidth / overallTimeSpan))
  }

  // Convert an X position to a timestamp
  function dateScale(xPosition: number): number {
    return Math.ceil(minimumStartDate.getTime() + xPosition * (overallTimeSpan / overallGraphWidth))
  }
</script>

<style>
.prefect-dag { @apply
  bg-slate-100
  rounded-lg
  w-full
  h-full
  overflow-hidden
  relative
}
.prefect-dag canvas { @apply
  absolute
  top-0
  left-0
  w-full
  h-full
}
</style>
