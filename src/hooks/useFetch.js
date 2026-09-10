import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Reusable custom hook to fetch asynchronous data with cleanup on unmount.
 * Uses AbortController to cancel in-flight requests when dependencies change or unmount.
 *
 * @param {Function} fetchFn - A function that returns a Promise, receiving { signal }
 * @param {Array} deps - Dependency array triggering refetch
 * @returns {{ data: any, loading: boolean, error: Error | null, refetch: Function }}
 */
export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchFnRef = useRef(fetchFn)
  useEffect(() => {
    fetchFnRef.current = fetchFn
  }, [fetchFn])

  const [refreshIndex, setRefreshIndex] = useState(0)

  const refetch = useCallback(() => {
    setLoading(true)
    setRefreshIndex((prev) => prev + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let isMounted = true

    fetchFnRef
      .current({ signal: controller.signal })
      .then((result) => {
        if (isMounted) {
          setData(result)
          setError(null)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return
        }
        if (isMounted) {
          setError(err)
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, refreshIndex])

  return { data, loading, error, refetch }
}
