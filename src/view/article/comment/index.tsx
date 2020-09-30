import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { format } from 'timeago.js'

import { Comment as CommentWrapper, CommentHeader, CommentInfoBar } from './style'
import Image from '../../../components/image'

import { Comment as CommentType } from '../../../types'

interface IProps {
  data?: CommentType;
  num?: number;
  articleAuthor?: string;
  children?: React.ReactElement;
}

const Comment: React.FC<IProps> = (props: IProps) => {
  const { data, num, articleAuthor } = props
  const history = useHistory()

  const visitUser = (name: string, e: React.MouseEvent) => {
    e.stopPropagation()
    history.push(`/user/${name}`)
  }

  return (
    <CommentWrapper>
      {
        props.children ||
        (
          data && (
            <>
              <CommentHeader>
                <Image
                  src={data.author.avatar_url}
                  width={30}
                  height={30}
                  radius={4}
                  onClick={(e) => visitUser(data.author.loginname, e)}
                />
                <CommentInfoBar>
                  <Link to={`/user/${data.author.loginname}`}>
                    <h3>
                      { data.author.loginname }
                      { data.author.loginname === articleAuthor ? '楼主' : '' }
                    </h3>
                  </Link>
                  <ul>
                    <li>{num}楼</li>
                    <li>{format(data.create_at, 'zh-CN')}</li>
                  </ul>
                </CommentInfoBar>
                <div className="corner-icon">
                  <span role="img" aria-label="like">👍</span>
                  <span>{data.ups?.length || 0}</span>
                </div>
              </CommentHeader>
              <main
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: data.content }}
              ></main>
            </>
          )
        )
      }
    </CommentWrapper>
  )
}

export default Comment
