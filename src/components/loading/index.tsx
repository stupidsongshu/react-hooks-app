import React from 'react'
import styled, { keyframes } from 'styled-components'

interface IProps {
  size?: number;
  text: string;
}

interface WrapperProps {
  size: number;
}

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
const LoadingWrapper = styled.div<WrapperProps>`
  margin: 10px auto;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  border: 4px solid rgba(0, 0, 0, .1);
  border-left-color: rgba(0, 0, 0, .3);
  animation: ${rotate} 1s linear infinite;
`;

const TextWrapper = styled.div`
  margin-bottom: 10px;
  text-align: center;
  font-size: 12px;
`;

const Loading: React.FC<IProps> = (props: IProps) => {
  const { size, text } = props
  return <>
    <LoadingWrapper size={size || 30} />
    { text && <TextWrapper>{text}</TextWrapper> }
  </>
}

export default React.memo(Loading)
