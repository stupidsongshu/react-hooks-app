import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Layout, { Fixed, Main } from './style'
import Header from '../../components/header'

const BaseLayout = () => {
  return (
    <Layout>
      <Fixed>
        <Header logo={require('@/assets/logo.svg')}/>
      </Fixed>
    </Layout>
  )
}

export default React.memo(BaseLayout)
