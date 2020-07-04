/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useCallback, useEffect } from "react"
import isEmpty from "../utils/isEmpty"
import useAsync from "./useAsync"

const defaultOption = {
  initPage: 1,
  initPageSize: 10,
}

interface Option extends Partial<typeof defaultOption> {
  mannual?: boolean;
  defaultResult?: { list: Array<any> };
  formatResult? <T>(res: any): { list: Array<T> };
  isNoMore? (res: any): boolean;
}

export default (
  action: (res: any) => Promise<any>,
  option: Option = defaultOption,
  deps: React.DependencyList = []
) => {

  option = Object.assign({}, defaultOption, option || {})

  const defaultList = option.defaultResult?.list || []

  const infoRef = useRef({
    completed: false,
    page: 1,
    list: [] as any[],
  })

  const actionHandler = useCallback(() => {
    return action({
      page: infoRef.current.page,
      pageSize: option.initPageSize,
    })
  }, [action])

  const { loading, run, result } = useAsync(actionHandler, {
    mannual: option.mannual || false,
    onSuccess: (res: { list?: any }) => {
      const prevList = infoRef.current.list
      const currentPage = infoRef.current.page

      const resultList = option.formatResult
        ? option.formatResult({
          response: res,
          page: currentPage,
        }).list
        : res.list

      infoRef.current.list = currentPage === 1 ? resultList : prevList.concat(resultList)

      infoRef.current.completed = option.isNoMore ? option.isNoMore(res) : false
    }
  })
  console.log('result===', result)

  const loadMore = useCallback(() => {
    infoRef.current = {
      ...infoRef.current,
      page: infoRef.current.page + 1,
    }
    run()
  }, [])

  useEffect(() => {
    infoRef.current = {
      completed: false,
      page: 1,
      list: defaultList || [],
    }
    isEmpty(defaultList) && run()
  }, [...deps])

  return {
    loading,
    loadMore,
    ...infoRef.current,
  }
}
