import { PToggle, PTextInput, PTextarea, PDateInput, PNumberInput, PCombobox, PSelect } from '@prefecthq/prefect-design'
import { JsonInput } from '@/components'

const components = [PToggle, PTextInput, PTextarea, JsonInput, PDateInput, PNumberInput, PCombobox, PSelect] as const
type Component = typeof components[number]

type WithPropsArgs<T extends Component, E extends string = '', P = InstanceType<T>['$props']> = Omit<Partial<P>, E> extends Omit<P, E>
  ? [ component: T, props?: Omit<P, E> ]
  : [ component: T, props: Omit<P, E> ]

type WithProps<T extends Component, E extends string = '', P = InstanceType<T>['$props']> = Omit<Partial<P>, E> extends Omit<P, E>
  ? { component: T, props?: Omit<P, E> }
  : { component: T, props: Omit<P, E> }

export function withProps<T extends Component>(...[component, props]: WithPropsArgs<T>): WithProps<T> {
  return {
    component,
    props,
  }
}

// withProps(PTextInput)

function withPropsWithoutExcluded<T extends Component, E extends string = 'modelValue'>(...[component, props]: WithPropsArgs<T, E>): WithProps<T, E> {
  return {
    component,
    props,
  }
}

// type WithPropsWithoutExcluded<E extends string, T extends Component> = (...[component, props]: WithPropsArgs<T, E>) => WithProps<T, E>

function withPropsWithoutExcludedFactory<T extends Component, E extends string>(prop: E) {
  return (...[component, props]: WithPropsArgs<T, E>): WithProps<T, E> => ({
    component,
    props,
  })
}

withProps(PToggle)
withProps(PToggle, {})
withPropsWithoutExcluded(PToggle, { disabled: true })

const test = withPropsWithoutExcludedFactory('modelValue')

test(PToggle)

// const withoutModelValue = withProps<'modelValue', Component>

// export function withPropsExcept<T extends string>(prop: T): void {
//   return withProps<_, Omit<
// }

// const withProps2 = withPropsExcept('modelValue')


