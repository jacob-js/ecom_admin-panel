import { Affix } from 'antd'
import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

function Nav({children}) {
  return (
    <div className='nav'>
        <div className={`sidebar`}><Sidebar /></div>
        <div className="nav-left">
            <Affix offsetTop={0}>
                <Header />
            </Affix>
            <div className="children"> {children} </div>
        </div>
    </div>
  )
}

export default Nav