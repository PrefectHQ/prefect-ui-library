// this can be used to cache bust between releases. Incrementing this will remove all caches using the previous version
const cacheVersion = 4
const cachePrefix = 'cache-key'
const cacheKeyPrefix = `${cachePrefix}-${cacheVersion}`

export function getCacheKey(label: string): string {
  return `${cacheKeyPrefix}:${label}`
}

type CacheKeyFunction = (key: string) => string

export function createCacheKeyFunction(version: number, prefix: string): CacheKeyFunction {
  return (key: string) => `${cachePrefix}-${cacheVersion}-${prefix}-${version}-${key}`
}

export function isCacheKey(key: string): boolean {
  return key.startsWith(cachePrefix)
}

export function isOldCacheKey(key: string): boolean {
  return isCacheKey(key) && !key.startsWith(cacheKeyPrefix)
}

export function clearOldCacheKeys(): void {
  const sessionStorageKeys = Object.keys(sessionStorage)

  sessionStorageKeys.forEach(key => {
    if (isOldCacheKey(key)) {
      sessionStorage.removeItem(key)
    }
  })

  const localStorageKeys = Object.keys(localStorage)

  localStorageKeys.forEach(key => {
    if (isOldCacheKey(key)) {
      localStorage.removeItem(key)
    }
  })

}