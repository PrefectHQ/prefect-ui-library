import { AsyncComponentLoader, Component, FunctionalComponent } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor = new (...args: any) => any

export type ComponentProps<TComponent extends Component> = TComponent extends Constructor
  ? InstanceType<TComponent>['$props']
  : TComponent extends AsyncComponentLoader<infer T extends Component>
    ? ComponentProps<T>
    : TComponent extends FunctionalComponent<infer T>
      ? T
      : never

type WithPropsArgs<T extends Component, E extends string = '', P = ComponentProps<T>> = Omit<Partial<P>, E> extends Omit<P, E>
  ? [ component: T, props?: Omit<P, E> & Record<string, unknown> ]
  : [ component: T, props: Omit<P, E> & Record<string, unknown> ]

type WithProps<T extends Component, E extends string = '', P = ComponentProps<T>> = Omit<Partial<P>, E> extends Omit<P, E>
  ? { component: T, props?: Omit<P, E> & Record<string, unknown> }
  : { component: T, props: Omit<P, E> & Record<string, unknown> }

export function withProps<T extends Component>(...[component, props]: WithPropsArgs<T>): WithProps<T> {
  return {
    component,
    props,
  } as WithProps<T>
}

export function withPropsWithoutExcluded<T extends Component, E extends string>(excluded: E | E[], ...[component, props]: WithPropsArgs<T, E>): WithProps<T, E> {
  return {
    component,
    props,
  } as WithProps<T, E>
}

export function withPropsWithoutExcludedFactory<E extends string>(prop: E | E[]) {
  return function<T extends Component>(...args: WithPropsArgs<T, E>): WithProps<T, E> {
    return withPropsWithoutExcluded(prop, ...args)
  }
}