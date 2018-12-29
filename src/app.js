import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { rootReducer } from './reducer'
import { BrowserRouter, Route } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './model'
import configureStore from './store'

const store = configureStore()

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/" component={App} />
        </BrowserRouter>
      </Provider>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))
