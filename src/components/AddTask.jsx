import React from 'react'
import {FaPlus} from 'react-icons/fa'

const AddTask = ({todo,setTodo,handleSubmit}) => {
  return (
    <form className='addTask' onSubmit={handleSubmit}>
      <label htmlFor='AddTodo' />
      <input type='text' placeholder='Add task' value={todo} onChange={(e)=>setTodo(e.target.value)}></input>
      <button type='submit'><FaPlus></FaPlus></button>
    </form>
  )
}

export default AddTask
