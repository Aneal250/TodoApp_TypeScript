import React, { useState } from 'react';
import logo from './logo.svg';
import InputField from './components/InputField';
import './App.css';
import { Todo } from './model';

const App: React.FC = () => {

  const  [ todo, setTodo ] = useState<string>('')
  const  [ todos, setTodos ] = useState<Todo[]>([])

const HandleAdd = (e: React.FormEvent) => {
  e.preventDefault()
  
  setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
  setTodo("")

}

console.log(todo, todos);
  return (
    <div className='App'>
      <span className='heading'>Taskify</span>
      <InputField todo={todo} setTodo={setTodo}  handleAdd={HandleAdd}/>
    </div>
  );
};

export default App;
