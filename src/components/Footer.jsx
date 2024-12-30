import React from 'react'

const Footer = ({todos}) => {
  return (
    <footer>
    <p>Total {todos.length} {todos.length==1?"task":"tasks"} in the list</p>
    </footer>
  )
}

export default Footer
