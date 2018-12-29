import { combineReducers } from 'redux'
import { ADD_TODO, DELETE_TODO } from '../action'

const initialState = {
  todos: ['22'],
  list: [9999],
}

export const todoApp = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, ...state.todos.push(action.text) }
    case DELETE_TODO:
      console.log('delete')
      return {
        ...state,
        todos: state.todos.filter(x => x !== action.text),
      }
    default:
      return state
  }
  console.log('state', state)
}

export const rootReducer = combineReducers({ todoApp })
