import React, { useState } from 'react'
import Global from './Global'

function GlobalProvider() {
    
    console.log(localStorage.getItem("token"))
    const [global,setGlobal]=useState({
        idtoken:JSON.parse(localStorage.getItem("token"))
    })
  return (
    <Global.Provider>{props.children}</Global.Provider>
  )
}

export default GlobalProvider