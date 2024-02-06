export type Component = { $props: unknown }
export type ComponentDefinition = { new(...args: unknown[]): Component }

// https://stackoverflow.com/questions/73732549/narrow-number-argument-of-function-to-be-literal-type?noredirect=1#comment130199140_73732549
// eslint-disable-next-line @typescript-eslint/ban-types
type NoInfer<T> = T & {}

type WithPropsArgs<T extends ComponentDefinition, E extends string = '', P = InstanceType<T>['$props']> = Omit<Partial<P>, E> extends Omit<P, E>
  ? [ component: T, props?: Omit<P, E> & Record<string, unknown> ]
  : [ component: T, props: Omit<P, E> & Record<string, unknown> ]

type WithProps<T extends ComponentDefinition, E extends string = '', P = InstanceType<T>['$props']> = Omit<Partial<P>, E> extends Omit<P, E>
  ? { component: T, props?: Omit<P, E> & Record<string, unknown> }
  : { component: T, props: Omit<P, E> & Record<string, unknown> }

export function withProps<T extends ComponentDefinition>(...[component, props]: WithPropsArgs<T>): WithProps<NoInfer<T>> {
  return {
    component,
    props,
  }
}

export function withPropsWithoutExcluded<T extends ComponentDefinition, E extends string>(excluded: E | E[], ...[component, props]: WithPropsArgs<T, E>): WithProps<NoInfer<T>, E> {
  return {
    component,
    props,
  }
}

export function withPropsWithoutExcludedFactory<E extends string>(prop: E | E[]) {
  return function<T extends ComponentDefinition>(...args: WithPropsArgs<T, E>): WithProps<T, E> {
    return withPropsWithoutExcluded(prop, ...args)
  }
}