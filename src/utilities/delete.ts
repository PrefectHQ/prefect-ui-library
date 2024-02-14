import { showToast } from '@prefecthq/prefect-design'
import { Action } from '@prefecthq/vue-compositions'
import { localization } from '@/localization'
import { asArray } from '@/utilities/arrays'
import { getApiErrorMessage } from '@/utilities/errors'

export type ItemType = 'Flow' | 'Deployment' | 'Flow run' | 'Work queue' | 'Block' | 'Notification' | 'Task run' | 'Concurrency Limit' | 'Work pool' | 'Schedule'
type MaybeSingleParam<T extends Action, Params = Parameters<T>> = Params extends [unknown] ? Params[0] | Params : Params

export async function deleteItem<T extends Action>(args: MaybeSingleParam<T>, endpoint: T, type: ItemType): Promise<ReturnType<T> | void> {
  let result: Promise<ReturnType<T>>

  try {
    const endpointArgs = asArray(args)
    result = await endpoint(...endpointArgs)
    showToast(localization.success.delete(type), 'success')
    return result
  } catch (error) {
    const message = getApiErrorMessage(error, localization.error.delete(type.toLowerCase()))
    showToast(message, 'error')

    console.error(error)
  }
}