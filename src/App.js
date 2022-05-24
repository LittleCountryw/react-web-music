import React, { memo, Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'
import GetRoutes from './router'

import LCAppHeader from './components/app-header'
import LCAppFooter from './components/app-footer'
import LCAppPlayerBar from './pages/player/app-player-bar'
const App = memo(() => {
  return (
    <div>
      <Provider store={store}>
        <HashRouter>
          <LCAppHeader />
          <Suspense fallback={<div>now loading...</div>}>
            <GetRoutes />
          </Suspense>
          <LCAppFooter />
          <LCAppPlayerBar />
        </HashRouter>
      </Provider>
    </div>
  )
})

export default App
