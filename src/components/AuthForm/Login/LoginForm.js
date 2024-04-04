import { useContext, useRef } from "react";
import axios from "axios";

import keys from "../../../keys";
import { useHistory } from "react-router";
import Global from "../../store/Global";

function LoginForm() {
  const history=useHistory()
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  const {setidtoken}=useContext(Global)

  const loginHandler = async (e) => {
    const email = enteredEmail.current.value;
    const password = enteredPassword.current.value;
    e.preventDefault();
    const obj = {
      email,
      password,
    };
    console.log(obj);
    try {
      const res = await axios.post(`${keys.SignInUrl}${keys.googleApiKey}`, {
        ...obj,
        returnSecureToken: true,
      });
      console.log("Sign in success", res.data);
      localStorage.setItem("token",JSON.stringify({
        token:res.data.idToken,
        email: res.data.email,
        date: new Date()
      }))
      setidtoken(res.data.idToken)

      history.replace("/user-nav/profile")

    } catch (error) {
      console.log("signin error", error.response.data);
      alert(error.response.data.error.message)
    }
  };
  return (
    <>
    <form className="form login-form" onSubmit={loginHandler}>
      <h1>Login</h1>
    <input placeholder="Email" id="email" ref={enteredEmail}/>
    <input placeholder="Password" type="password" id="password" ref={enteredPassword}/>
    <button className="form-btn login-btn" type="submit">Login</button>
    </form>

      </>
  );
}

export default LoginForm;
