import React, { useState } from "react";
import Global from "./Global";

function GlobalProvider(props) {
  console.log(localStorage.getItem("token"));
  const [global, setGlobal] = useState({
    idtoken: localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")).token:"",
    setidtoken: setidtokenn,
    clearToken: clearToken
  });

  function clearToken(){
    setGlobal((prev)=>{
      let tempGlobal={...prev}
      tempGlobal.idtoken=""
      localStorage.removeItem("token")
      return tempGlobal
    })
  }

  function setidtokenn(token) {
    console.log("setidtoken",token)
    setGlobal((prev) => {
      const tempGlobal = { ...prev };
      tempGlobal.idtoken = token;
      console.log("tempglobal",tempGlobal)
      return tempGlobal;
    });
  }
  return <Global.Provider value={global}>{props.children}</Global.Provider>;
}

export default GlobalProvider;
