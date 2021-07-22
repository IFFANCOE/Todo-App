import './App.css';
import { useState } from 'react';

const App = () => {

  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  //! have 2 functions
  //! F get input to set in state todoinput
  const handleInputChange = (e) => {
    //- get input from user update to todo
    setTodoInput(e.target.value);
  }

  //! F listen submit tag form 
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (todoInput !== "") {
      //- update data is array to todos
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todoInput.trim()  // trim is "john" <<< from "j o h n"
        }
      ])
    }
    setTodoInput("");
  }
  console.log(todos);
  return (
    <div className="App">
      <h1>Todo App</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="todoinput"
          placeholder="Creact a new todo"
          value={todoInput}
          onChange={handleInputChange} // see console.log is  j , jo ,joh , john
        />
      </form>
      {/*  output todo */}
      <ul className="output-todolist">
        {/* render todos state */}
        {todos.map((todo) => (
          <li key={todoInput.id}>{todo.text} </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
