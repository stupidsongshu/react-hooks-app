import React from 'react'
import { useParams, useLocation } from 'react-router-dom'

import sdk from '../../service/cnode'
import { Article as ArticleType } from '../../types'
import useAsync from '../../hooks/useAsync'

import isEmpty from '../../utils/isEmpty'
import ArticleWrapper, { Title, SkeletonMain } from './style'
import InfoBar from './info-bar'

import 'github-markdown-css'
import './code-prettify-sunburst.css'

interface TopicDetailResult {
  data: ArticleType;
}

const Article: React.FC = () => {
  const { id = '' } = useParams()
  let info = useLocation().state as ArticleType
  // console.log(id)
  // console.log(info)
  // useEffect(() => {
  //   sdk.getTopicDetail(id).then((resp) => {
  //     console.log(resp)
  //   })
  // }, [])

  const { loading, result = { data: {} as ArticleType } } = useAsync<TopicDetailResult>(() => sdk.getTopicDetail(id))
  info = isEmpty(result.data) || loading ? info : result.data

  // window.PR 代码高亮，使用的外部js文件
  Promise.resolve().then(() => {
    // console.log(window.PR)
    window.PR.prettyPrint()
  })

  return (
    <ArticleWrapper>
      { info.hasOwnProperty('content')
      ? (
      <>
        <Title>{info && info.title}</Title>
        <InfoBar value={info} />
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: info.content || '' }}
        ></div>
      </>)
      : <SkeletonMain /> }
    </ArticleWrapper>
  )
}

export default Article
