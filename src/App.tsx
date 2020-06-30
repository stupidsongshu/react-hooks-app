import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { BaseLayout } from './layouts'
import { GlobalStyle } from './style/global'

const basename = '/cnode'

const App: React.FC = () => {
  return (
    <div className="App">
      <GlobalStyle />

      <BrowserRouter basename={basename}>
        <Switch>
          <Route path="/" component={BaseLayout} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
