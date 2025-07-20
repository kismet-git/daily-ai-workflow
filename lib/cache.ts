const cache = new Map<string, { data: any; timestamp: number }>()

export function setCache(key: string, data: any, ttl = 300000) {
  // 5 minutes default
  cache.set(key, {
    data,
    timestamp: Date.now() + ttl,
  })
}

export function getCache(key: string) {
  const cached = cache.get(key)
  if (!cached) return null

  if (Date.now() > cached.timestamp) {
    cache.delete(key)
    return null
  }

  return cached.data
}

export function clearCache() {
  cache.clear()
}
