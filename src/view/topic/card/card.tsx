import React from 'react'
import { useHistory } from 'react-router-dom'
import { format } from 'timeago.js'
import { Topic as TopicType } from '../../../types'
import { CardWrapper, CardHead, CardBody, Info, Time } from './style'
import Tag from '../../../components/tag'
import Image from '../../../components/image'

interface Iprops {
  data: TopicType;
  onClick?: (e: React.MouseEvent) => void;
}

const Card: React.FC<Iprops> = (props: Iprops) => {
  const { data, onClick } = props
  const history = useHistory()

  const getTabType = () => {
    if (data.top) return 'top'
    if (data.good) return 'good'
    return data.tab
  }

  const visitUser = (e: React.MouseEvent, name: string) => {
    e.stopPropagation()
    history.push(`/user/${name}`)
  }

  return <CardWrapper onClick={onClick}>
    <CardHead>
      <Tag type={getTabType()} />
      <h4>{data.title}</h4>
    </CardHead>

    <CardBody>
      <Image
        src={data.author?.avatar_url || ''}
        width={44}
        height={44}
        radius={4}
        onClick={e => visitUser(e, data.author?.loginname)}
      />
      <Info>
        <ul>
          <li>查看数：{data.visit_count}</li>
          <li>回复数：{data.reply_count}</li>
        </ul>
        <Time>{format(data.last_reply_at, 'zh_CN')}</Time>
      </Info>
    </CardBody>
  </CardWrapper>
}

export { createSkeleton } from './style'
export default React.memo(Card)
