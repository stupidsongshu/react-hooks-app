import React from 'react'

interface InfoProps {
  avatar_url: string;

}

const UserInfo: React.FC<InfoProps> = (props: InfoProps | undefined) => {
  return <div>UserInfo</div>
}

export default React.memo(UserInfo)
