// this can be used to cache bust between releases. Incrementing this will remove all caches using the previous version
const globalCacheVersion = 4
const globalCachePrefix = 'cache-key'
const globalCacheKeyPrefix = `${globalCachePrefix}-${globalCacheVersion}`

export function getCacheKey(label: string): string {
  return `${globalCacheKeyPrefix}:${label}`
}

type CacheKeyFunction = (key: string) => string

export function createCacheKeyFunction(version: number, prefix: string): CacheKeyFunction {
  const cachePrefix = `${globalCacheKeyPrefix}-${prefix}`
  const cachePrefixWithVersion = `${cachePrefix}-${version}`

  clearOldFeatureCacheKeys(cachePrefix, cachePrefixWithVersion)

  return (key: string) => `${cachePrefixWithVersion}-${key}`
}

function clearOldFeatureCacheKeys(prefix: string, prefixWithVersion: string): void {
  const isOldFeatureCacheKey = (key: string): boolean => {
    return key.startsWith(prefix) && !key.startsWith(prefixWithVersion)
  }

  Object.keys(sessionStorage).forEach(key => {
    if (isOldFeatureCacheKey(key)) {
      sessionStorage.removeItem(key)
    }
  })

  Object.keys(localStorage).forEach(key => {
    if (isOldFeatureCacheKey(key)) {
      localStorage.removeItem(key)
    }
  })

}

export function isCacheKey(key: string): boolean {
  return key.startsWith(globalCachePrefix)
}

export function isOldCacheKey(key: string): boolean {
  if (!isCacheKey(key)) {
    return false
  }

  return !key.startsWith(globalCacheKeyPrefix)
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