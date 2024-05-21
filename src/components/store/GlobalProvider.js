import React, { useState } from "react";
import Global from "./Global";

function GlobalProvider(props) {
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
    setGlobal((prev) => {
      const tempGlobal = { ...prev };
      tempGlobal.idtoken = token;
      return tempGlobal;
    });
  }
  return <Global.Provider value={global}>{props.children}</Global.Provider>;
}

export default GlobalProvider;
