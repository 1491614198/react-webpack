import { createStore, applyMiddleware, compose } from 'redux'

import { syncHistoryWithStore } from 'react-router-redux'
import { rootReducer } from './reducer'
import { BrowserRouter, Route } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './model'

const win = window

const sageMiddleware = createSagaMiddleware()

const middlewares = []

let storeEnhancers

if (process.env.NODE_ENV === 'production') {
  storeEnhancers = compose(applyMiddleware(...middlewares, sageMiddleware))
} else {
  storeEnhancers = compose(
    applyMiddleware(...middlewares, sageMiddleware),
    win && win.devToolsExtension ? win.devToolsExtension() : f => f,
  )
}

export default function configureStore(initialState = {}) {
  const store = createStore(rootReducer, initialState, storeEnhancers)
  sageMiddleware.run(rootSaga)
  if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer/index.js')
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
