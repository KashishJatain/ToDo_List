import { useState,useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import React from 'react';
import AddTask from "./components/AddTask.jsx";
import Tasks from "./components/Tasks.jsx";
import Search from "./components/Search.jsx";
import Footer from"./components/Footer.jsx";
import About from "./components/About.jsx";
import apiRequest from "./apiRequest.jsx";
import { createBrowserRouter,RouterProvider } from "react-router-dom";

function App(){
  const API_URL="http://localhost:3500/tasks";
  const [todo,setTodo]=useState('');
  const [todos,setTodos]=useState([]);
  const [search,setSearch]=useState('');
  const [editTodo,setEdit]=useState("");
  const [fetchError,setFetchError]=useState('');
  const [isLoading,setIsLoading]=useState(true);

  useEffect(()=>{
    const fetchData=async ()=>{
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error('Did not receive expected data');
        const todolist=await response.json();
        setTodos(todolist);
        setFetchError(null);
      } 
      catch (err){
        setFetchError(err.message);
      }
      finally {
        setIsLoading(false);
      }
    }
    setTimeout(()=>fetchData(),2000);
  }
    , [])
  

  const handleAdd=async (todo)=>{
    const id=todos.length?(Number(todos[todos.length-1].id)+1).toString():"1";
    id.toString();
    const newTodo={id,todo,checked:false};
    const todoList=[...todos,newTodo];
    setTodos(todoList);

    const postOptions={
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(newTodo)
    }
    const result =await apiRequest(API_URL,postOptions);
    if(result) setFetchError(result);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!todo) return;
    handleAdd(todo);
    setTodo('');
    setEdit('');
  }

  const handleDelete=async(id)=>{
    const todoList=todos.filter((todo)=>todo.id!==id);
    setTodos(todoList);

    const deleteOptions={ method:'DELETE'};
    const reqUrl=`${API_URL}/${id}`;
    const result=await apiRequest(reqUrl,deleteOptions);
    if(result) setFetchError(result);
  }

  const handleCheck=async(id)=>{
    const todoList=todos.map((todo)=>todo.id===id?{...todo,checked:!todo.checked}:todo);
    setTodos(todoList);

    const myTodo=todoList.filter((todo)=>todo.id===id);
    const updateOptions={
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({checked:myTodo[0].checked})
    };
    const reqUrl=`${API_URL}/${id}`;
    const result=await apiRequest(reqUrl,updateOptions);
    if(result) setFetchError(result);
  }

  const handleEdit=async(id)=>{
    let t=todos.filter((todo)=>todo.id===id);
    setTodo(t[0].todo);
    handleDelete(id);
  }

  const router=createBrowserRouter([
    {
      path:'/',
      element:<><Navbar/>
      <AddTask todo={todo} setTodo={setTodo} editTodo={editTodo} handleSubmit={handleSubmit} />
      <Search search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Loading Tasks....</p>}
        {fetchError && <p style={{color:"red"}} >{`Error:${fetchError}`}</p>}
        {!isLoading && !fetchError &&<Tasks todos={todos.filter(todo=>(todo.todo).toLowerCase().includes(search.toLowerCase()))} handleDelete={handleDelete} handleCheck={handleCheck} handleEdit={handleEdit} />}
      </main>
      
      <Footer todos={todos} /></>
    },
    {
      path:'/About',
      element:<><Navbar/><About/></>
    }
  ])

  return <>
  <RouterProvider router={router} />
  </>
}

export default App
