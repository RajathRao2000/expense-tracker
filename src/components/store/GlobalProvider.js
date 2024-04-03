import React, { useState } from "react";
import Global from "./Global";

function GlobalProvider(props) {
  console.log(localStorage.getItem("token"));
  const [global, setGlobal] = useState({
    idtoken: JSON.parse(localStorage.getItem("token")).token,
    setidtoke: setIdToken,
  });

  function setIdToken(token) {
    setGlobal((prev) => {
      const tempGlobal = { ...prev };
      tempGlobal.idtoken = token;
      return tempGlobal;
    });
  }
  return <Global.Provider value={global}>{props.children}</Global.Provider>;
}

export default GlobalProvider;
