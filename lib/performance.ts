// Performance monitoring utilities
export function measurePerformance<T>(name: string, fn: () => Promise<T>): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const start = performance.now()

    try {
      const result = await fn()
      const end = performance.now()
      const duration = end - start

      console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`)

      resolve(result)
    } catch (error) {
      const end = performance.now()
      const duration = end - start

      console.error(`Performance: ${name} failed after ${duration.toFixed(2)}ms`, error)
      reject(error)
    }
  })
}

// Memory usage tracking
export function logMemoryUsage(label: string): void {
  if (typeof process !== "undefined" && process.memoryUsage) {
    const usage = process.memoryUsage()
    console.log(`Memory ${label}:`, {
      rss: `${Math.round(usage.rss / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)}MB`,
      external: `${Math.round(usage.external / 1024 / 1024)}MB`,
    })
  }
}

// Simple debounce utility
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
