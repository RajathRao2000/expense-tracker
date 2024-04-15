import { useRef } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";

import keys from "../../../keys";
import "./SignUp.css";


function SignUp() {
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  const enteredConfirmPassword = useRef();
  const history = useHistory();
  const location = useLocation();
  const dark=useSelector(state=>state.theme.dark)

  const SignUpHandler = async (e) => {
    e.preventDefault();
    if (
      enteredPassword.current.value !== enteredConfirmPassword.current.value
    ) {
      alert("passwords do not match");
      return;
    }

    const obj = {
      email: enteredEmail.current.value,
      password: enteredPassword.current.value,
    };

    try {
      const res = await axios.post(`${keys.SignUpUrl}${keys.googleApiKey}`, {
        ...obj,
        returnSecureToken: true,
      });
      console.log("user has successfully signed up", res.data);
      history.replace("/login")
    } catch (error) {
      console.log(error.response.data.error);
      alert(error.response.data.error.message)
    }
  };
  const checkPassword = () => {
    // console.log("onchange")
    if (enteredConfirmPassword.current.value !== enteredPassword.current.value) {
      console.log("not same");
    }
  };

  return (
    <>
    <form onSubmit={SignUpHandler} className={"form sign-up-form "+`${dark ? "bg-black text-white" : "bg-blue-50"}`}>
    <h1 className="text-4xl">Sign up</h1>
    <input className={`text-black`} placeholder="Email" name="email" ref={enteredEmail}/>
    <input className={`text-black`} placeholder="Password" name="password" type="password" ref={enteredPassword}/>
    <input className={`text-black`} placeholder="Confirm Password" name="cPassword" type="password" onChange={checkPassword} ref={enteredConfirmPassword}/>
    <button className="form-btn signup-btn" type="submit">Sign up</button>
    </form>
    </>
  );
}

export default SignUp;
