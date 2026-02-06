import React from 'react'

function home() {
  return (
    <div>
      <button onClick={()=>(window.location.href='/additem')}>Add Item</button>
    </div>
  )
}

export default home
