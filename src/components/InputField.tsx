import React, { useRef } from 'react'
import './styles.css'

interface Props {
	todo: string;
	setTodo: React.Dispatch<React.SetStateAction<string>>;
	handleAdd: (e: React.FormEvent) => void;
}




const InputField = ( { todo, setTodo, handleAdd}: Props) => {

    const InputRef = useRef<HTMLInputElement>(null);

  return (
    <form className='input' onSubmit={(e) => {
        handleAdd(e);
        InputRef.current?.blur()
    }}>
        <input type="input" placeholder='Enter a Task'  
        value={todo}  onChange={(e) => setTodo(e.target.value)} className='input__box'/>
        <button className="input__submit" type="submit">Go</button>
    </form>
  )
}

export default InputField;
