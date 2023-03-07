export function eventTargetIsInput(eventTarget: EventTarget | null): boolean {
  if (!(eventTarget instanceof HTMLElement)) {
    return false
  }

  const eventTargetTagName = eventTarget.tagName.toLowerCase()
  return ['input', 'textarea'].includes(eventTargetTagName)
}