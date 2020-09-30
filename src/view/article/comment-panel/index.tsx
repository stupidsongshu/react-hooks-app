import React from 'react'

import Comment from '../comment'

import { Comment as CommentType } from '../../../types'
import { Total, CommentPanelWrapper } from './style'

interface IProps {
  list?: CommentType[];
  articleAuthor?: string;
}

const CommentPanel: React.FC<IProps> = (props: IProps) => {
  const { list, articleAuthor } = props

  return (
    <CommentPanelWrapper>
      <Total>共{list?.length || 0}条评论</Total>
      {
        list?.length ?
          list.map((item: CommentType, index: number) => (
            <Comment
              key={item.id}
              data={item}
              articleAuthor={articleAuthor}
              num={index + 1}
            />
          ))
        : (
          <Comment>
            <div className="empty">暂无评论</div>
          </Comment>
        )
      }
    </CommentPanelWrapper>
  )
}

CommentPanel.defaultProps = {
  list: [],
}

export { SkeletonComment } from './style'
export default CommentPanel
