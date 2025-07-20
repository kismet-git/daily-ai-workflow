// Simple in-memory cache with TTL
interface CacheItem<T> {
  value: T
  expires: number
}

class SimpleCache {
  private cache = new Map<string, CacheItem<any>>()

  set<T>(key: string, value: T, ttlMs = 300000): void {
    // 5 minutes default
    this.cache.set(key, {
      value,
      expires: Date.now() + ttlMs,
    })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() > item.expires) {
      this.cache.delete(key)
      return null
    }

    return item.value
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }
}

export const cache = new SimpleCache()
\
export const withCache = async <T>(key: string, fn: () => Promise<T>, ttlMs = 300000)
: Promise<T> =>
{
  const cached = cache.get<T>(key)
  if (cached !== null) {
    return cached;
  }

  const result = await fn()
  cache.set(key, result, ttlMs)
  return result;
}
