export function timeout(milliseconds: number, signal?: AbortSignal): Promise<void> {
  let resolve: (value: void | PromiseLike<void>) => void

  const promise = new Promise<void>((...args) => [resolve] = args)

  const timeout = setTimeout(() => resolve(), milliseconds)

  signal?.addEventListener('abort', () => {
    clearTimeout(timeout)
    resolve()
  })

  return promise
}