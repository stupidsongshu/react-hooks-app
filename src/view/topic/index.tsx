import React, { useCallback, useMemo } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import sdk from '../../service/cnode'

import ScrollList from '../../components/scroll-list'
import Card, { createSkeleton } from './card/card'
import { Topic as TopicType } from '../../types'
import isEmpty from '../../utils/isEmpty'

import useLoadMore from '../../hooks/useLoadMore'

const PAGE_SIZE = 20

const Skeleton = createSkeleton(5)

const Topic: React.FC = () => {
  const { tag = '' } = useParams()
  const history = useHistory()

  const getTopicsByTab = useCallback((info) => {
    return sdk.getTopicsByTab(tag, info.page || 1, PAGE_SIZE)
  }, [tag])

  const manual = true

  const { list, loading, completed, loadMore } = useLoadMore(
    getTopicsByTab,
    {
      manual,
      formatResult: ({ response: { data = [] } = {} }) => ({
        list: data
      }),
      isNoMore: ({ data }) => {
        return data && data.length > PAGE_SIZE
      }
    },
    [tag]
  )

  // useEffect(() => {
  //   if (manual) {
  //     // getTopicsByTab({}).then(resp => {
  //     //   console.log(resp)
  //     //   loading = false
  //     //   list = resp.data
  //     // })
  //     loadMore()
  //   }
  // }, [tag])

  const hasList = useMemo(() => !isEmpty(list), [list])

  const visitArticle = (info: TopicType) => {
    history.push({
      // pathname: `/article`,
      // search: info.id,
      pathname: `/article/${info.id}`,
      state: info
    })
  }

  return <>
    {
      hasList &&
      <ScrollList
        loading={loading}
        completed={completed}
        onLoad={loadMore}
        >
        {
          list.map((item: TopicType) => <Card key={item.id} data={item} onClick={() => visitArticle(item)} />)
        }
      </ScrollList>
    }
    { !hasList && Skeleton }
  </>
}

export default Topic
