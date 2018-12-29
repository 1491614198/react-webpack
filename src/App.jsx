import React, { Component } from 'react'
import { addTodo, ADD_TODO, deleteTodo } from './action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addSaga } from './model'
import { createStore } from 'redux'
import './style.css'
import './common.css'

class App extends Component {
  add = () => {
    this.props.onaddTodo('bbbb')
    // store.dispatch(ADD_TODO)
  }
  delete = () => {
    this.props.ondeleteTodo('aaaa')
  }
  render() {
    return (
      <div className="app">
        <div onClick={this.add}>加+++</div>
        <div onClick={this.delete}>删</div>
        <div onClick={this.add}>查</div>
        <div>333445554</div>
        {/* <div>{BrowserVersion}</div> */}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    todos: state.todoApp.todos,
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onaddTodo: addTodo,
      ondeleteTodo: deleteTodo,
    },
    dispatch,
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
