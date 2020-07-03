import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import SDK, { TopicTabEnum } from '../../service/cnode'

import ScrollList from '../../components/scroll-list'
import Card, { createSkeleton } from './card/card'
import { Topic as TopicType } from '../../types'
import isEmpty from '../../utils/isEmpty'

const Skeleton = createSkeleton(5)

const Topic: React.FC = () => {
  const { tag = '' } = useParams()
  const [data, setData] = useState([])
  const history = useHistory()

  useEffect(() => {
    console.log(TopicTabEnum)
    const sdk = new SDK()

    sdk.getTopicsByTab(tag)
      .then(res => {
        console.log(res)
        setData(res.data)
      })
  }, [tag])

  const visitArticle = (info: TopicType) => {
    history.push({
      pathname: `/article?id=${info.id}`,
      state: info
    })
  }

  const hasList = useMemo(() => !isEmpty(data), [data])

  const handleOnLoad = () => {
    console.log('onLoad')
  }
  const loading = true
  return <>
    {
      hasList &&
      <ScrollList
        loading={loading}
        completed={!loading}
        onLoad={handleOnLoad}
        >
        {
          data.map((item: TopicType) => <Card key={item.id} data={item} onClick={() => visitArticle(item)} />)
        }
      </ScrollList>
    }
    { !hasList && Skeleton }
  </>
}

export default Topic
