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
    TextStyle,
    IBitmapTextStyle,
    ITextStyle
  } from 'pixi.js'
  import { onMounted, ref } from 'vue'
  import { Layers, ModifiedGraphData, ModifiedGraphNode } from '@/models'

  const props = defineProps<{
    layers: Layers,
    graphData: ModifiedGraphData,
  }>()

  const stage = ref<HTMLDivElement>()
  const devicePixelRatio = window.devicePixelRatio || 2


  const styles = {
    defaultViewportPadding: 40,
  }

  onMounted(() => {
    if (!stage.value) {
      console.error('Stage reference not found')
      return
    }

    const app = createPixiApp({
      width: stage.value.clientWidth,
      height: stage.value.clientHeight,
      devicePixelRatio,
    })

    const viewport = createViewport({
      app,
      stageWidth: stage.value.clientWidth,
      stageHeight: stage.value.clientHeight,
    })
    app.stage.addChild(viewport)

    stage.value.appendChild(app.view)

    initBitmapFonts({ devicePixelRatio }).then(textStyles => {
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
          nodesContainer.addChild(nodeContainer)
        })
      })

      viewport.addChild(nodesContainer)

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
    })
  })

  type CreatePixiAppProps = {
    width: number,
    height: number,
    devicePixelRatio: number,
  }
  function createPixiApp({
    width,
    height,
    devicePixelRatio,
  }: CreatePixiAppProps): Application {
    return new Application({
      backgroundAlpha: 0,
      width,
      height,
      resolution: devicePixelRatio,
      autoDensity: true,
      antialias: true,
    })
  }

  type CreateViewport = {
    app: Application,
    stageWidth: number,
    stageHeight: number,
  }
  function createViewport({
    app,
    stageWidth,
    stageHeight,
  }: CreateViewport): Viewport {
    const newViewport = new Viewport({
      screenWidth: stageWidth,
      screenHeight: stageHeight,
      passiveWheel: false,
      interaction: app.renderer.plugins.interaction,
    })

    newViewport
      .drag({
        keyToPress: ['Space'],
      })
      .wheel({
        trackpadPinch: true,
        wheelZoom: false,
      })
      .clampZoom({
        minWidth: stageWidth / 2,
      })
      .decelerate()

    return newViewport
  }

  type InitBitmapFonts = {
    devicePixelRatio: number,
  }
  function initBitmapFonts({
    devicePixelRatio,
  }: InitBitmapFonts): Promise<{ base: Partial<IBitmapTextStyle> }> {
    return new Promise((resolve) => {
      const font = new FontFaceObserver('InterVariable')

      font.load().then(() => {
        BitmapFont.from(
          'DefaultFont',
          {
            fontFamily: 'InterVariable',
            fontSize: 24,
            lineHeight: 32,
          },
          {
            resolution: devicePixelRatio,
          },
        )

        const base: Partial<IBitmapTextStyle> = {
          fontName: 'DefaultFont',
          fontSize: 24,
          align: 'left',
        }

        resolve({
          base,
        })
      })
    })
  }

  type CreateNodeProps = {
    node: ModifiedGraphNode,
    textStyles: { base: Partial<IBitmapTextStyle> },
  }
  function createNode({
    node,
    textStyles,
  }: CreateNodeProps): Record<string, Container> {
    const nodeContainer = new Container()
    const label = new BitmapText(node.id, textStyles.base)
    const box = new Graphics()

    box.beginFill(0xFFFFFF)
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
