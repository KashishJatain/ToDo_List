import React from 'react'

const Search = ({search,setSearch}) => {
  return (
    <form className='searchTask' >
      <label htmlFor='SearchTask' />
      <input type='text' placeholder='Search Task' value={search} onChange={(e)=>{setSearch(e.target.value);}} />
    </form>
  )
}

export default Search
