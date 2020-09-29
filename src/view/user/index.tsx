import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { format } from 'timeago.js'

import sdk from '../../service/cnode'
import useAsync from '../../hooks/useAsync'
import { UserDetail, ArticleLink } from '../../types'
import isEmpty from '../../utils/isEmpty'

import Image from '../../components/image'
import {
  InfoPanel,
  InfoContent,
  ListPanel,
  ListItem,
  SkeletonInfo,
  SkeletonList,
} from './style'

interface InfoProps {
  loginname?: string;
  githubUsername?: string;
  avatar_url?: string;
  score?: number;
  create_at: string;
}

interface ListProps {
  title: string;
  value: ArticleLink[];
}

const Info: React.FC<{ value: InfoProps | undefined }> = React.memo((props) => {
  const info = props.value || ({} as InfoProps)
  return !isEmpty(info) ? (
    <InfoPanel>
      <Image
        src={info?.avatar_url || ''}
        width={60}
        height={60}
        radius={4}
      />
      <InfoContent>
        <h3>{info?.loginname}</h3>
        <ul>
          <li>积分：{info?.score}</li>
          <li>注册于 {format(info.create_at, 'zh_CN')}</li>
        </ul>
      </InfoContent>
    </InfoPanel>
  ) : <SkeletonInfo />
})

const List:React.FC<ListProps> = React.memo((props) => {
  const { title, value } = props
  return !isEmpty(value) ? (
    <ListPanel>
      <h3>{title}</h3>
      {value.map(item => {
        return <ListItem key={item.id}>
          <Link to={`/article/${item.id}`}>{item.title}</Link>
          <span className="create-at">{format(item.last_reply_at, 'zh_CN')}</span>
        </ListItem>
      })}
    </ListPanel>
  ) : <SkeletonList />
})

const User: React.FC<{}> = () => {
  const { name = '' } = useParams()

  const { result: infoResult } = useAsync<{data: UserDetail}>(() => {
    return sdk.getUserDetail(name)
  })
  const { result: collectionResult } = useAsync<{data: ArticleLink[]}>(() => {
    return sdk.getTopicCollect(name)
  })
  const info = infoResult ? infoResult.data : ({} as UserDetail)
  const collect = collectionResult ? collectionResult.data : ([] as ArticleLink[])

  return <div>
    <Info value={info} />
    <List title="最近发布话题" value={info.recent_topics} />
    <List title="最近回复" value={info.recent_replies} />
    <List title="收藏话题" value={collect} />
  </div>
}

export default User
