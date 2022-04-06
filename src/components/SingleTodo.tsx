import React, { useState, useRef, useEffect } from 'react'
import { Todo } from '../model';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import "./styles.css";
import TodoList from './TodoList';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    index: number;
	todo: Todo;
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo, todos, setTodos, index} : Props) => {

    const [ edit, setEdit ] = useState<boolean>(false);
    const [ editTodo, setEditTodo] = useState<string>(todo.todo)

    const InputRef = useRef<HTMLInputElement>(null)


const handleDone = (id: number) => {

    setTodos(todos.map((todo) => todo.id === id?{...todo, isDone: !todo.isDone}: todo))

}


const handleDelete = ( id: number) => {
    setTodos(todos.filter((todo) => todo.id !==id))

}

const handleEdit = (e: React.FormEvent, id:  number) => {

    e.preventDefault()
    setTodos(todos.map((todo) => (
        todo.id===id?{...todo, todo:editTodo}: todo
    )))
    setEdit(false)

}

    useEffect(() => {

        InputRef.current?.focus();

    }, [edit])



  return (
      <Draggable draggableId={todo.id.toString()} index={index}>
          {
              (provided, snapshot) => (

                <form action="" className={`todos__single ${snapshot.isDragging ? 'drag' : ""}`} onSubmit={(e) => handleEdit(e,todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    { edit ? (
                        <input value={editTodo} 
                            ref={InputRef} 
                            onChange={(e) => setEditTodo(e.target.value)} 
                            className="todos__single--test"/>
                    ): (
                        todo.isDone ? (
                            <s className="todos__single--text">{todo.todo}</s>
                        ) : (
                            <span className="todos__single--text">{todo.todo}</span>
                        )
                    )}
                    <div>
                        <span className="icon" onClick={() => {
                            if(!edit && !todo.isDone){
                                setEdit(!edit);
                        }
                        }}>
                            <AiFillEdit />
                        </span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}>
                            <AiFillDelete />
                        </span>
                        <span className="icon" onClick={() => handleDone(todo.id)}>
                            <MdDone />
                        </span>
                    </div>
                </form>
              )
          }
      </Draggable>
	);
}

export default SingleTodo