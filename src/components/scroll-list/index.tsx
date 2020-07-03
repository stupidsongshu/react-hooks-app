import React, { useRef, useCallback, useEffect } from 'react'
import 'intersection-observer'
import styled from 'styled-components'

import Loading from '../../components/loading'

interface IProps {
  children: React.ReactNode;
  loading: boolean;
  completed: boolean;
  onLoad: () => void;
}

const TipWord = styled.div`
  margin: 10px auto;
  text-align: center;
  color: #333;
`;

const ScrollList: React.FC<IProps> = (props: IProps) => {
  const { loading, completed, onLoad } = props

  const bottomEl: any = useRef<HTMLDivElement>()

  const handler = useCallback((entries) => {
    console.log(entries)
    if (completed) return
    if (entries[0].intersectionRatio > 0) {
      onLoad()
    }
  }, [completed, onLoad])

  const observer: React.RefObject<IntersectionObserver> = useRef(new IntersectionObserver(handler))

  useEffect(() => {
    console.log(observer)
    console.log(bottomEl)
    observer.current && observer.current.observe(bottomEl.current)

    return () => {
      observer.current && observer.current.unobserve(bottomEl.current)
    }
  }, [])

  return <div ref={bottomEl}>
    {props.children}
    {loading && !completed && <Loading text={'玩命加载中'} />}
    {!loading && completed && <TipWord>加载完成</TipWord>}
  </div>
}

export default React.memo(ScrollList)
