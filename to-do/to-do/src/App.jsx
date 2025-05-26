import { useState } from 'react'
import { FiMinusCircle } from "react-icons/fi";
import { FaPen } from "react-icons/fa";
import './App.css'
import './index.css'


function App() {

  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  
  const addTodo = () => {
    if (inputValue.trim() === '') return;
    setTodos([...todos, inputValue]);
    setInputValue('');
  };
  const editTodo = (indexToEdit, newValue) => {
    setTodos(todos.map((todo, i) => i === indexToEdit ? newValue : todo));
  };
  const deleteTodo = (indexToDelete) => {
    setTodos(todos.filter((_, i) => i !== indexToDelete));
  };
  
  

  return (
    <>
      <div style={{display:'flex', gap:10, height:100}}>
        <h1>To-Do giriniz: </h1>
        <input type="text" className="buttonStyle todoEntry" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addTodo} style={{height:40, marginTop: 22}}>Ekle</button>
      </div>
      {todos.map((value, index) => (
  <TodoComponent 
    value={value} 
    key={index} 
    index={index} 
    editTodo={editTodo} 
    deleteTodo={deleteTodo} 
  />
))}

    </>
  )
}

function TodoComponent({ value, index, editTodo, deleteTodo }) {
  return (
    <div className='todo'>
      <input
        type='text'
        value={value}
        className='inside buttonStyle'
        onChange={(e) => editTodo(index, e.target.value)}
      />
      <div className='icons'>
        <button onClick={() => deleteTodo(index)}>
          <FiMinusCircle />
        </button>
        <button>
          <FaPen />
        </button>
      </div>
    </div>
  );
}



export default App
