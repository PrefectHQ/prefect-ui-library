export type ConditionalTab = {
  label: string,
  hidden?: boolean,
}

export function tabs(tabs: ConditionalTab[]): string[] {
  return tabs.filter(tab => tab.hidden !== false).map(tab => tab.label)
}