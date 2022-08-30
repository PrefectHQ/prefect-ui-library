import { randomId as generateRandomId } from '@prefecthq/prefect-design'
import { MockFunction } from '@/services/Mocker'

export const randomId: MockFunction<string, []> = function() {
  return generateRandomId()
}