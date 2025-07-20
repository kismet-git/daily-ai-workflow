// Performance monitoring utilities
export const measurePerformance = (name: string) => {
  const start = performance.now()

  return {
    end: () => {
      const duration = performance.now() - start
      console.log(`${name} took ${duration.toFixed(2)}ms`)
      return duration
    },
  }
}

export const withPerformanceLogging = async <T>(\
  name: string,\
  fn: () => Promise<T>\
)
: Promise<T> =>
{
  const measure = measurePerformance(name)
  try {
    const result = await fn()
    measure.end()
    return result;
  } catch (error) {
    measure.end()
    throw error
  }
}

// Simple memory usage tracker
export const getMemoryUsage = () => {
  if (typeof process !== "undefined" && process.memoryUsage) {
    const usage = process.memoryUsage()
    return {
      rss: Math.round(usage.rss / 1024 / 1024),
      heapTotal: Math.round(usage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(usage.heapUsed / 1024 / 1024),
      external: Math.round(usage.external / 1024 / 1024),
    }
  }
  return null
}
