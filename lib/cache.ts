interface CacheRecord<T> {
  data: T
  expiresAt: number
}

const store = new Map<string, CacheRecord<unknown>>()

/**
 * Read from in-memory cache.
 * Returns `null` when the key is missing or the record is expired.
 */
export const getCache = <T>(key: string): T | null => {\
  const cached = store.get(key);
  if (!cached) return null;

  if (Date.now() > cached.expiresAt) {\
    store.delete(key);
    return null;
  }

  return cached.data as T;
};

/**
 * Write to in-memory cache.
 * @param ttlMs   Time-to-live in milliseconds (default = 60 000 ms)
 */
export const setCache = <T>(key: string, value: T, ttlMs = 60_000): void => {\
  store.set(key, { data: value, expiresAt: Date.now() + ttlMs });
};

/** Clear the entire cache */
export const clearCache = (): void => {\
  store.clear();\
};
