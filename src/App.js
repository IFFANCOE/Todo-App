import './App.css';
import { useState, useEffect } from 'react';

const App = () => {
  //--------------------------------------useState-----------------------------------------------------
  const [todos, setTodos] = useState(() => {
    //* get value from localStorage
    const storageTodos = localStorage.getItem("todoskey") // todoskey same in localStorage
    if (storageTodos) {
      return JSON.parse(storageTodos) // JSON.parse is string  to object
    } else {
      return [];  // return first state
    }
  });
  const [todoInput, setTodoInput] = useState("");
  // edit state
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  //----------------------------------------------------------------------------------------------------


  /// useEffect  is component render done 
  useEffect(() => {

    localStorage.setItem('todoskey', JSON.stringify(todos))  // JSON.stringify is Js object to string

  }, [todos]) // dependency [todos] is update localStorage together js code

  //----------------------------------------------- Functions ------------------------------------------------
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
  //! F Delete button Click
  const handelDeleteClick = (id) => {
    // todos.filter is delete data
    const removeItem = todos.filter((todoPara) => {
      return todoPara.id !== id //all todos not match is delete
    })
    // ^ remove done than set update state current remove to todos
    setTodos(removeItem);

    // finished than go to add delete button 
  }
  //! F Edit button Click
  const handleEditClick = (todoInput) => {
    setIsEditing(true)
    // send all todo  store in currentTodo
    setCurrentTodo({ ...todoInput })
  }
  //! F user edit input
  // get value when user edit input and set new value in state
  const handleEditInputChange = (e) => {
    // text is text not variable
    setCurrentTodo({ ...currentTodo, text: e.target.value })
    console.log("Current Todo: ", currentTodo);
  }
  //! F update
  // user push button Update Todo not update but will be todo update this function
  const handleUpdateTodo = (id, updatedTodo) => {
    // store data update and update state Todos
    const updatedItem = todos.map((todo) => {
      // updatedTodo is new todo
      return todo.id === id ? updatedTodo : todo;
    })
    // after user push update then set this
    setIsEditing(false)
    setTodos(updatedItem)
  }
  //! F submit form when click update
  const handleEditFormSubmit = (e) => {
    e.preventDefault()
    // call F
    handleUpdateTodo(currentTodo.id, currentTodo)
  }

  //-----------------------------------------------------------------------------------------------

  console.log(todos);
  return (
    <div className="App" >
      <h1>Todo App</h1>

      {/* when user edit  */}
      {isEditing ? (
        <form onSubmit={handleEditFormSubmit}>
          <h2>Edit Todo </h2>
          <label htmlFor="editTodo">Edit todo:  </label>
          <input
            type="text"
            name="editTodo"
            placeholder="Edit todo"
            value={currentTodo.text}
            onChange={handleEditInputChange}
          />
          <button type="submit">Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        // user no Edit
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="todoinput"
            placeholder="Creact a new todo"
            value={todoInput}
            onChange={handleInputChange} // see console.log is  j , jo ,joh , john
          />
          <button className="btnAdd">Add</button>
        </form>
      )}
      {/*  output todo */}
      <ul className="output-todolist">
        {/* render map todos state */}
        {todos.map((todoMap) => (
          <li key={todoMap.id}>
              {todoMap.text}
              {" "}
              <button className="btnEdit" onClick={() => handleEditClick(todoMap)} >Edit</button>
              <button className="btnDelete" onClick={() => handelDeleteClick(todoMap.id)}>Delete</button>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
