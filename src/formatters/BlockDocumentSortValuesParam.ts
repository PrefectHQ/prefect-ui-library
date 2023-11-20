import { InvalidRouteParamValue, RouteParam } from '@prefecthq/vue-compositions'
import { LocationQueryValue } from 'vue-router'
import { BlockDocumentSortValues, isBlockDocumentSortValue } from '@/types/SortOptionTypes'

export class BlockDocumentSortValuesSortParam extends RouteParam<BlockDocumentSortValues> {
  protected parse(value: LocationQueryValue): BlockDocumentSortValues {
    if (isBlockDocumentSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }

  protected format(value: BlockDocumentSortValues): LocationQueryValue {
    if (isBlockDocumentSortValue(value)) {
      return value
    }

    throw new InvalidRouteParamValue()
  }
}
