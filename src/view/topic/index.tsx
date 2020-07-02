import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import SDK, { TopicTabEnum } from '../../service/cnode'

const Topic: React.FC = () => {
  const { tag = ''} = useParams()

  useEffect(() => {
    console.log(TopicTabEnum)
    const sdk = new SDK()

    sdk.getTopicsByTab(tag)
      .then(res => {
        console.log(res)
      })
  }, [])

  // const getTopicByTab = useCallback((info) => {
  //   console.log(tag, info)
  //   const sdk = new SDK()
  //   sdk.get('/topics', {
  //     page: 1,
  //     tab: tag
  //   }).then(res => {
  //     console.log(res)
  //   })
  // }, [tag])

  // getTopicByTab({})

  return <div>Topic</div>
}

export default Topic
