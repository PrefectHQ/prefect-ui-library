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
  }

  let pixiApp: Application
  let viewport: Viewport
  let textStyles: TextStyles

  let graphWidth: number
  let minimumStartDate: Date
  let maximumEndDate: Date
  let graphTimeSpan: number

  const guidesContainer = new Container()
  const minGuideGap = 80
  const maxGuideGap = 260
  let guideTimeSpan = 1000 * 30

  let nodes: Record<string, Container> = {}

  onMounted(() => {
    initTimeScale()
    initPixiApp()
    initTimeGuidesLayer()
    initViewport()

    setGuideTimeSpan()

    initBitmapFonts({ devicePixelRatio })
      .then(newTextStyles => {
        textStyles = newTextStyles
        initTimeGuides()
        initContent()
      })
  })

  // watchEffect(() => {
  //   // when graphData updates, re-render
  //   const updatedData = props.graphData

  //   if (!!pixiApp && updatedData.length > 0) {
  //     // @TODO – This doesn't really work
  //     // Need to find any new nodes in the data and add it to the stage while updating any other nodes.
  //     nodes = Object.keys(nodes).reduce((acc: Record<string, Container>, nodeId) => {
  //       const nodeContainer = nodes[nodeId]
  //       const nodeData = updatedData.find(node => node.id === nodeId)

  //       if (!nodeData) {
  //         nodeContainer.destroy()
  //         return acc
  //       }

  //       if (nodeContainer) {
  //         const box = nodeContainer.children[0] as Graphics
  //         const label = nodeContainer.children[1] as BitmapText
  //         const stateFill = nodeData.state?.name ? stateColors[nodeData.state.name] : 0x9aa3b0

  //         if (box.fill !== stateFill) {
  //           box.clear()
  //           box.beginFill(stateFill)
  //           box.drawRoundedRect(
  //             0,
  //             0,
  //             label.width + 24 * 2,
  //             label.height + 24 * 2,
  //             12,
  //           )
  //           box.endFill()
  //         }

  //         acc[nodeId] = nodeContainer
  //       } else {
  //         // @TODO - add a new node
  //       }

  //       return acc
  //     }, {})
  //   }
  // })

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
    graphTimeSpan = timeSpan < minimumTimeSpan ? minimumTimeSpan : timeSpan

    // @TODO: graphWidth determine the overall width of the chart for layout purposes.
    //        Since our total time scale is unknown, determine a method for choosing a
    //        nice looking width of the graph.
    graphWidth = stage.value?.clientWidth ? stage.value.clientWidth * 2 : 2000
  }

  function setGuideTimeSpan(): void {
    const viewportWidth = viewport.right - viewport.left
    const guideCount = Math.ceil(viewportWidth / (maxGuideGap - minGuideGap / 2))
    const span = graphTimeSpan / guideCount

    const time = {
      second: 1000,
      minute: 1000 * 60,
      hour: 1000 * 60 * 60,
      day: 1000 * 60 * 60 * 24,
      week: 1000 * 60 * 60 * 24 * 7,
    }
    const timeSpanSlots = [
      {
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

    const guideTimeSpan = timeSpanSlots.find(timeSlot => timeSlot.ceiling > span)?.span ?? time.minute

    const nextDate = new Date(minimumStartDate.getTime() + guideTimeSpan)

    console.log('yo', { gap: xScale(nextDate), nextDate, guideCount, graphWidth, span })
    // if guideTimeSpan is.....
    // between 13 mins and 1.24 hrs, round to the nearest 30 minues
    // between 1.24 and 3 hrs, round to 1 hr
    // between 3 and 8 hours, round to 5 hrs
    // between 8 and 13 hours, round to 10 hours
    // between 13 and 24 hours, round to 12 hours
    // between 24 hours and 1.5 weeks, round to 1 day
    // between 1.5 weeks and 3 weeks, round to 1 week
    // 3 weeks and up, round to months

    // if (span)
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

  function initTimeGuidesLayer(): void {
    pixiApp.stage.addChild(guidesContainer)
  }

  function initTimeGuides(): void {
    const guideLine = new Graphics()
    guideLine.beginFill(0xc9d5e2)
    guideLine.drawRect(
      xScale(minimumStartDate),
      0,
      1,
      pixiApp.renderer.height,
    )
    guideLine.endFill()
    // guideLine.beginFill(0xc9d5e2)
    // guideLine.drawRect(
    //   xScale(minimumStartDate) + 240,
    //   0,
    //   1,
    //   pixiApp.renderer.height,
    // )
    // guideLine.endFill()

    const guideLabel = new BitmapText(minimumStartDate.toLocaleTimeString(), textStyles.timeMarkerLabel)
    guideLabel.position.set(4, 4)

    guidesContainer.addChild(guideLine)
    guidesContainer.addChild(guideLabel)

    pixiApp.ticker.add(() => {
      updateGuides()
      guidesContainer.position.set(
        viewport.worldTransform.tx,
        0,
      )
    })
  }


  function updateGuides(): void {
    const visibleStartTime = dateScale(-viewport.worldTransform.tx)
    const visibleEndTime = dateScale(-viewport.worldTransform.tx + viewport.screenWidth)
    const totalVisibleTime = visibleEndTime - visibleStartTime

    // init guideTimeSpan with a value based on the total time span.
    // take the totalVisibleTime, separate it into guideTimeSpan chunks
    // if that amount of time makes a gap outside the bounds of min/max, adjust the guideTimeSpan
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
    props.layers.forEach((layer, layerIndex) => {
      Object.keys(layer).forEach(nodeId => {
        const node = props.graphData.find(node => node.id === nodeId)

        if (!node) {
          console.error(`Node with id ${nodeId} not found`)
          return
        }

        const { nodeContainer } = createNode({
          node,
          textStyles,
        })

        nodeContainer.position.set(
          layerIndex * 800,
          (layer[nodeId] - 1) * 200,
        )

        nodes[nodeId] = nodeContainer
        nodesContainer.addChild(nodeContainer)
      })
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
    const label = new BitmapText(node.id, textStyles.nodeTextInverse)
    const box = new Graphics()
    const stateFill = node.state?.name ? stateColors[node.state.name] : 0x9aa3b0

    box.beginFill(stateFill)
    box.drawRoundedRect(
      0,
      0,
      label.width + 24 * 2,
      label.height + 24 * 2,
      12,
    )

    label.position.set(24, 24)

    nodeContainer.addChild(box)
    nodeContainer.addChild(label)

    return {
      nodeContainer,
    }
  }

  // Convert a date to an X position
  function xScale(date: Date): number {
    return Math.ceil((date.getTime() - minimumStartDate.getTime()) * (graphWidth / graphTimeSpan))
  }

  // Convert an X position to a timestamp
  function dateScale(xPosition: number): number {
    return Math.ceil(minimumStartDate.getTime() + xPosition * (graphTimeSpan / graphWidth))
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
