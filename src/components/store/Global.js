import { createContext } from "react";

const Global = createContext({
  idtoken: "",
  setidtokenn: ()=>{},
  clearToken: ()=>{}
});

export default Global;
