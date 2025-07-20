interface CacheRecord<T> {
  data: T
  timestamp: number
}

const store = new Map<string, CacheRecord<unknown>>()

export const getCache = <T>(key: string): T | null => {\
  const cached = store.get(key);
  if (!cached) return null;

  if (Date.now() > cached.timestamp) {\
    store.delete(key);
    return null;
  }

  return cached.data as T;
};

export const setCache = <T>(key: string, value: T, ttlMs = 60000): void => {\
  store.set(key, { data: value, timestamp: Date.now() + ttlMs });
};

export const clearCache = (): void => {\
  store.clear();\
};
