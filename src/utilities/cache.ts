// this can be used to cache bust between releases. Incrementing this will remove all caches using the previous version
const cacheVersion = 1
const cacheKeyPrefix = `cache-key-${cacheVersion}`

export function getCacheKey(label: string): string {
  return `${cacheKeyPrefix}:${label}`
}

export function clearOldCacheKeys(): void {
  console.log('clearing caches')

  const sessionStorageKeys = Object.keys(sessionStorage)

  sessionStorageKeys.forEach(key => {
    if (!key.startsWith(cacheKeyPrefix)) {
      sessionStorage.removeItem(key)
    }
  })

  const localStorageKeys = Object.keys(localStorage)

  localStorageKeys.forEach(key => {
    if (!key.startsWith(cacheKeyPrefix)) {
      localStorage.removeItem(key)
    }
  })

}