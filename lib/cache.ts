// Simple in-memory cache with TTL
interface CacheItem<T> {
  value: T
  expires: number
}

class SimpleCache<T> {
  private cache = new Map<string, CacheItem<T>>()

  set(key: string, value: T, ttlMs = 300000): void {
    // 5 minutes default
    const expires = Date.now() + ttlMs
    this.cache.set(key, { value, expires })
  }

  get(key: string): T | null {
    const item = this.cache.get(key)

    if (!item) {
      return null
    }

    if (Date.now() > item.expires) {
      this.cache.delete(key)
      return null
    }

    return item.value
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expires) {
        this.cache.delete(key)
      }
    }
  }
}

// Global cache instances
export const workflowCache = new SimpleCache<any>()
export const featuredCache = new SimpleCache<any>()

// Cache helper functions
export function setCache<T>(key: string, value: T, ttlMs?: number): void {
  workflowCache.set(key, value, ttlMs)
}

export function getCache<T>(key: string): T | null {
  return workflowCache.get(key) as T | null
}

export function clearCache(): void {
  workflowCache.clear()
  featuredCache.clear()
}

// Periodic cleanup (run every 10 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(
    () => {
      workflowCache.cleanup()
      featuredCache.cleanup()
    },
    10 * 60 * 1000,
  )
}
