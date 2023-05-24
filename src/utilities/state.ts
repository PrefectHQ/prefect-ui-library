import { StateType } from '@/models'
import { prefectStateNameTypes, prefectStateNames } from '@/types/states'
import { capitalize } from '@/utilities/strings'

export function mapStateNameToStateType(stateName: string = 'Unknown'): { name: string, type: StateType | null } {
  const prefectStateName = prefectStateNames.find(name => stateName.toLowerCase() === name.toLowerCase())

  if (prefectStateName) {
    const stateType = prefectStateNameTypes[prefectStateName]

    return {
      name: prefectStateName,
      type: stateType,
    }
  }

  return {
    name: stateName,
    type: null,
  }
}

function getStateTypeStyleElement(type: StateType | null): HTMLElement {
  const typeString = type ?? 'Unknown'
  const className = `state--${typeString.toLowerCase()}`
  const id = `${typeString}-style-sampler`
  let element = document.getElementById(id)

  if (!element) {
    element = document.createElement('div')
    element.classList.add(className)
    element.id = id

    document.body.appendChild(element)
  }

  return element
}

export function getStateTypeStyles(type: StateType | null): { color: string, background: string } {
  const element = getStateTypeStyleElement(type)
  const style = getComputedStyle(element)

  return {
    color: style.color,
    background: style.backgroundColor,
  }
}

export function mapStateTypeOrNameToStateName(stateTypeOrName: string): string {
  switch (stateTypeOrName) {
    case 'completed':
    case 'running':
    case 'scheduled':
    case 'pending':
    case 'failed':
    case 'cancelled':
    case 'crashed':
    case 'paused':
      return capitalize(stateTypeOrName)
    default:
      return stateTypeOrName
  }
}