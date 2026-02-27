// Action types
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const UPDATE_STATUS = 'UPDATE_STATUS';

// Action creators
function addTodo(text) {
  return {
    type: ADD_TODO,
    payload: {
      id: Date.now(),
      text: text,
      done: false
    }
  };
}

function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: id
  };
}

function updateStatus(id) {
  return {
    type: UPDATE_STATUS,
    payload: id
  };
}

// Initial state
const initialState = {
  todos: []
};

// Reducer
function todoReducer(state, action) {
  if(!state) {
    state = initialState;
  }
  
  if(action.type === ADD_TODO) {
    return {
      todos: state.todos.concat([action.payload])
    };
  }
  
  if(action.type === DELETE_TODO) {
    return {
      todos: state.todos.filter(function(todo) {
        return todo.id !== action.payload;
      })
    };
  }
  
  if(action.type === UPDATE_STATUS) {
    return {
      todos: state.todos.map(function(todo) {
        if(todo.id === action.payload) {
          return {
            id: todo.id,
            text: todo.text,
            done: !todo.done
          };
        }
        return todo;
      })
    };
  }
  
  return state;
}

// Create store manually
const store = Redux.createStore(todoReducer);
