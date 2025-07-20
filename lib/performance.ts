export const measurePerformance = <T extends (...args: any[]) => Promise<any>>(name: string, fn: T): T => {
  return (async (...args: Parameters<T>) => {
    const start = performance.now()
    try {
      const result = await fn(...args)
      const end = performance.now()
      console.log(`${name} took ${end - start} milliseconds`)
      return result
    } catch (error) {
      const end = performance.now()
      console.error(`${name} failed after ${end - start} milliseconds:`, error)
      throw error
    }
  }) as T
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export type WebVitalMetric = {
  id: string
  name: string
  label: "web-vital" | "custom"
  value: number
}

export const reportWebVitals = (metric: WebVitalMetric): void => {
  if (process.env.NODE_ENV !== "production") {
    console.info("[WebVital]", metric.name, metric.value)
  }
}
