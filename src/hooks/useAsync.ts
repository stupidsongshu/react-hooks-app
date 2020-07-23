/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useCallback, useEffect } from "react"

interface Page {
  page: number;
  pageSize: number;
}

const noop = () => {}

interface SuccessHandler {
  <T>(res: any): T;
}

interface ErrorHandler {
  (err: any): void;
}

const defaultOption = {
  manual: false,
  onSuccess: noop as SuccessHandler,
  onError: noop as ErrorHandler,
}

interface Option extends Partial<typeof defaultOption> {
  onSuccess: SuccessHandler;
  onError: ErrorHandler;
}

interface AsyncResult<T> {
  loading: boolean;
  run: () => void;
  // run1?(): void;
  result: T | undefined;
}

// interface Test<T> {
//   a: T;
// }

const useAsync = <T>(
  action: () => Promise<any>,
  customOption: object = {},
): AsyncResult<T> => {
  const option: Option = Object.assign({}, defaultOption, customOption)

  // const result: Array<T> = []
  // const obj: Test<number> = { a: 123 }
  // const result = obj.a
  const result = useRef<T>()
  const [loading, setLoading] = useState(false)

  const run = useCallback(
    () => {
      setLoading(true)
      const ret: Promise<any> = action()
      if (ret.then) {
        ret
        .then((res) => {
          result.current = option.onSuccess(res) || res
        })
        .catch(option.onError)
        .finally(() => setLoading(false))
      } else {
        setLoading(false)
      }
    },
    [action, option]
  )

  useEffect(() => {
    !option.manual && run()
  }, [])

  return {
    loading,
    run,
    result: result.current
  }
}

export default useAsync
