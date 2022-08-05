import { PositionMethod, Position } from '@prefecthq/prefect-design'

export type NudgedPositionMethod = (nudgeX?: number, nudgeY?: number) => PositionMethod

export const top: NudgedPositionMethod = (nudgeX: number = 0, nudgeY: number = 0) => {
  return function(target: DOMRect, content: DOMRect, container: DOMRect): Position {
    const top = target.top - container.top - content.height + nudgeY
    const left = target.left - container.left + target.width / 2 - content.width / 2 + nudgeX

    return {
      top,
      left,
    }
  }
}

export const right: NudgedPositionMethod = (nudgeX: number = 0, nudgeY: number = 0) => {
  return function(target: DOMRect, content: DOMRect, container: DOMRect): Position {
    const top = target.top - container.top - content.height / 2 + target.height / 2 + nudgeY
    const left = target.left - container.left + target.width / 2 - content.width / 2 + nudgeX

    return {
      top,
      left,
    }
  }
}

export const bottom: NudgedPositionMethod = (nudgeX: number = 0, nudgeY: number = 0) => {
  return function(target: DOMRect, content: DOMRect, container: DOMRect): Position {
    const top = target.top - container.top + target.height + nudgeY
    const left = target.left - container.left + target.width / 2 - content.width / 2 + nudgeX

    return {
      top,
      left,
    }
  }
}

export const left: NudgedPositionMethod = (nudgeX: number = 0, nudgeY: number = 0) => {
  return function(target: DOMRect, content: DOMRect, container: DOMRect): Position {
    const top = target.top - container.top - content.height / 2 + target.height / 2 + nudgeY
    const left = target.left - container.left - content.width + nudgeX

    return {
      top,
      left,
    }
  }
}

export const topRight: NudgedPositionMethod = (nudgeX: number = 0, nudgeY: number = 0) => {
  return function(target: DOMRect, content: DOMRect, container: DOMRect): Position {
    const top = target.top - container.top - content.height + nudgeY
    const left = target.right - container.left - content.width + nudgeX

    return {
      top,
      left,
    }
  }
}

export const bottomRight: NudgedPositionMethod = (nudgeX: number = 0, nudgeY: number = 0) => {
  return function(target: DOMRect, content: DOMRect, container: DOMRect): Position {
    const top = target.top - container.top + target.height + nudgeY
    const left = target.right - container.left - content.width + nudgeX

    return {
      top,
      left,
    }
  }
}

export const topLeft: NudgedPositionMethod = (nudgeX: number = 0, nudgeY: number = 0) => {
  return function(target: DOMRect, content: DOMRect, container: DOMRect): Position {
    const top = target.top - container.top - content.height + nudgeY
    const left = target.right - container.left - target.width + nudgeX

    return {
      top,
      left,
    }
  }
}

export const bottomLeft: NudgedPositionMethod = (nudgeX: number = 0, nudgeY: number = 0) => {
  return function(target: DOMRect, content: DOMRect, container: DOMRect): Position {
    const top = target.top - container.top + target.height + nudgeY
    const left = target.right - container.left - target.width + nudgeX

    return {
      top,
      left,
    }
  }
}
