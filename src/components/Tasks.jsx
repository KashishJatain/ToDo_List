import React from 'react'
import { FaPen, FaTrashAlt } from 'react-icons/fa'

const Tasks = ({todos,handleDelete,handleCheck,handleEdit}) => {
  return (
   <section>
    <h2>Tasks List</h2>
   <ul>
   {todos.length?
   todos.map((todo)=>
   (<li key={Number(todo.id)} style={{display:"flex"}}>
    <input type="checkbox" checked={todo.checked} onChange={()=>handleCheck(todo.id)} />
    <p style={todo.checked?{textDecoration:"line-through"}:null}>{todo.todo}</p>
    <FaPen type='button' onClick={()=>{handleEdit(todo.id)}} />
    <FaTrashAlt type='button' onClick={()=>handleDelete(todo.id)} />
   </li>)
   )
   :<p style={{margin:"200px"}}>NO TASK IN THE LIST</p>
   }
   </ul>
   
   </section>
  )
}

export default Tasks
