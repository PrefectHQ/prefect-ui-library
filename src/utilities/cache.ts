// this can be used to cache bust between releases. Incrementing this will remove all caches using the previous version
const globalCacheVersion = 4
const globalCachePrefix = 'cache-key'
const globalCacheKeyPrefix = `${globalCachePrefix}-${globalCacheVersion}`
const cacheKeyPrefixes = new Set<string>()

export function getCacheKey(label: string): string {
  return `${globalCacheKeyPrefix}:${label}`
}

type CacheKeyFunction = (key: string) => string

export function createCacheKeyFunction(version: number, prefix: string): CacheKeyFunction {
  const cachePrefix = `${globalCacheKeyPrefix}-${prefix}-${version}`

  cacheKeyPrefixes.add(cachePrefix)

  return (key: string) => `${cachePrefix}-${key}`
}

export function isCacheKey(key: string): boolean {
  return key.startsWith(globalCachePrefix)
}

export function isOldCacheKey(key: string): boolean {
  if (!isCacheKey(key)) {
    return false
  }

  const matchesGlobalKeyPrefix = key.startsWith(globalCacheKeyPrefix)

  if (!matchesGlobalKeyPrefix) {
    return true
  }

  const matchesCacheKey = Array.from(cacheKeyPrefixes.values()).some(prefix => key.startsWith(prefix))

  return !matchesCacheKey
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