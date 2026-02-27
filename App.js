function ToDoApp() {
  const React = window.React;
  const ReactDOM = window.ReactDOM;
  const Redux = window.Redux;
  const ReactRedux = window.ReactRedux;
  
  const useState = React.useState;
  const useDispatch = ReactRedux.useDispatch;
  const useSelector = ReactRedux.useSelector;
  
  const dispatch = useDispatch();
  const todos = useSelector(function(state) { return state.todos; });
  const inputValue = useState('');
  const setInputValue = inputValue[1];
  const currentInput = inputValue[0];

  const handleAdd = function() {
    if(currentInput.trim() !== '') {
      dispatch(addTodo(currentInput));
      setInputValue('');
    }
  };

  const handleDelete = function(id) {
    dispatch(deleteTodo(id));
  };

  const handleToggle = function(id) {
    dispatch(updateStatus(id));
  };

  const handleKeyPress = function(e) {
    if(e.key === 'Enter') {
      handleAdd();
    }
  };

  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement('h1', null, 'My Todo List'),
    
    React.createElement(
      'div',
      { className: 'input-box' },
      React.createElement('input', {
        type: 'text',
        value: currentInput,
        onChange: function(e) { setInputValue(e.target.value); },
        onKeyPress: handleKeyPress,
        placeholder: 'Enter a new task...',
        className: 'input-field'
      }),
      React.createElement(
        'button',
        { onClick: handleAdd, className: 'add-btn' },
        'Add Task'
      )
    ),

    React.createElement(
      'div',
      { className: 'todos-list' },
      todos.length === 0 ? 
        React.createElement('p', { className: 'no-todos' }, 'No tasks yet. Add one!') :
        todos.map(function(todo) {
          return React.createElement(
            'div',
            { key: todo.id, className: 'todo-item ' + (todo.done ? 'done' : '') },
            React.createElement(
              'div',
              { className: 'todo-text' },
              React.createElement('input', {
                type: 'checkbox',
                checked: todo.done,
                onChange: function() { handleToggle(todo.id); },
                className: 'checkbox'
              }),
              React.createElement('span', { className: 'text' }, todo.text)
            ),
            React.createElement(
              'button',
              { onClick: function() { handleDelete(todo.id); }, className: 'delete-btn' },
              'Delete'
            )
          );
        })
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(ReactRedux.Provider, { store: store }, React.createElement(ToDoApp)));
