import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { BaseLayout } from './layouts'

const basename = '/cnode'

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <Switch>
          <Route path="/" component={BaseLayout} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
