import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'

// const PAGE_SIZE = 20

const Topic: React.FC = () => {
  const { tag = ''} = useParams()

  const getTopicByTab = useCallback((info) => {
    console.log(tag, info)
  }, [tag])

  return <div>Topic</div>
}

export default Topic
