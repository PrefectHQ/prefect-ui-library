export type Component = { $props: any }
export type ComponentDefinition = { new(...args: any[]): Component }

type WithPropsArgs<T extends ComponentDefinition, E extends string = '', P = InstanceType<T>['$props']> = Omit<Partial<P>, E> extends Omit<P, E>
  ? [ component: T, props?: Omit<P, E> ]
  : [ component: T, props: Omit<P, E> ]

type WithProps<T extends ComponentDefinition, E extends string = '', P = InstanceType<T>['$props']> = Omit<Partial<P>, E> extends Omit<P, E>
  ? { component: T, props?: Omit<P, E> }
  : { component: T, props: Omit<P, E> }

export function withProps<T extends ComponentDefinition>(...[component, props]: WithPropsArgs<T>): WithProps<T> {
  return {
    component,
    props,
  }
}

export function withPropsWithoutExcluded<T extends ComponentDefinition, E extends string>(excluded: E | E[], ...[component, props]: WithPropsArgs<T, E>): WithProps<T, E> {
  return {
    component,
    props,
  }
}

export function withPropsWithoutExcludedFactory<E extends string>(prop: E | E[]) {
  return function<T extends ComponentDefinition>(...[component, props]: WithPropsArgs<T, E>): WithProps<T, E> {
    return withPropsWithoutExcluded(prop, component, props)
  }
}