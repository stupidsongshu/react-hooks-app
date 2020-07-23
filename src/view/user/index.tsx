import React from 'react'
import { useParams } from 'react-router-dom'

import sdk from '../../service/cnode'
import useAsync from '../../hooks/useAsync'

const User: React.FC = () => {
  const { name = '' } = useParams()

  const { result: infoResult } = useAsync(() => {
    return sdk.getUserDetail(name)
  })
  console.log(infoResult)
  return <div>
    user: {name}
  </div>
}

export default User
