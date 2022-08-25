export function combine(...args: (string | undefined)[]): string {
  return args.filter(part => !!part).join('/')
}