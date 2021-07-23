import { useState, useEffect } from "react";
const Todos = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState(() => {
        const storeage = localStorage.getItem('todos')
        if (storeage) {
            return JSON.parse(storeage)
        } else {
            return []
        }
    });
    const [isEditing, setIsEditing] = useState(false)
    const [curr, setCurr] = useState({})
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))

    }, [todos])

    const handleInputChange = (e) => {
        setTodo(e.target.value);
    };

    const heldleSubmitForm = (e) => {
        e.preventDefault();
        if (todo !== "") {
            setTodos([
                ...todos,
                {
                    id: todos.length + 1,
                    text: todo.trim()
                }]);
        }
        setTodo("");
    };
    //   console.log(todos);
    const handleClickDelete = (id) => {
        const remove = todos.filter((todo) => todo.id !== id)
        setTodos(remove)
    }
    const handleClickEdit = (todo) => {
        setIsEditing(true)
        setCurr({ ...todo })
    }
    const handleEditChange = (e) => {
        setCurr({ ...curr, text: e.target.value })
        console.log("Currenttodo: ", curr);
    }
    const handleUpdateTodo = (id, updatedtodo) => {
        const update = todos.map((todo) => {
            return todo.id == id ? updatedtodo : todo
        })
        setIsEditing(false)
        setTodos(update)
    }
    const handleUpdateform = (e) => {
        e.preventDefault()
        handleUpdateTodo(curr.id,curr)
    }
    return (
        <div style={{ textAlign: 'center' }} >
            <h1>Todo </h1>
            {isEditing ? (
                <form onSubmit={handleUpdateform}>
                    <h1>Edit todo</h1>
                    <input
                        type="text"
                        placeholder="Edit todo"
                        value={curr.text}
                        onChange={handleEditChange}
                    />
                    <button type="submit">updated</button>
                    <button onClick={() => setIsEditing(false)}>Cancal</button>
                </form>
            ) : (
                <form onSubmit={heldleSubmitForm}>
                    <input
                        placeholder="Creact a new Todo"
                        name="todoinput"
                        value={todo}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Add</button>
                </form>
            )}

            {todos.map((todo) => (
                <ul>
                    <li key={todo.index}>
                        {todo.text}
                        {" "}
                        <button onClick={() => handleClickEdit(todo)}>Edit</button>
                        <button onClick={() => handleClickDelete(todo.id)}>Delete</button>

                    </li>
                </ul>

            ))}
        </div>
    );
};

export default Todos;
