import React from 'react'
import InputMui from '../components/InputMui'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="upper">
        <div className="logo">
          <div className="png">.</div>
          <span>Post-lease</span>
        </div>
        <div className="search">
          <InputMui title="Search" />
        </div>
        <div className="panel">panel</div>
      </div>
      <div className="lower">xDDDD</div>
    </div>
  )
}

export default Navbar
