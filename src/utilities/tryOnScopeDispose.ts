import { getCurrentScope, onScopeDispose } from 'vue'

export function tryOnScopeDispose(callback: () => void): boolean {
  if (getCurrentScope()) {
    onScopeDispose(callback)

    return true
  }

  return false
}