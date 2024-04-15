import { useRef } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router";

import keys from "../../../keys";
import "./SignUp.css";


function SignUp() {
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  const enteredConfirmPassword = useRef();
  const history = useHistory();
  const location = useLocation();
  console.log(history, location);
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
    console.log({
      ...obj,
      returnSecureToken: true,
    });
    try {
      const res = await axios.post(`${keys.SignUpUrl}${keys.googleApiKey}`, {
        ...obj,
        returnSecureToken: true,
      });
      console.log("user has successfully signed up", res.data);
    } catch (error) {
      console.log(error);
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
    <form onSubmit={SignUpHandler} className="form sign-up-form ">
    <h1>Sign up</h1>
    <input placeholder="Email" name="email" ref={enteredEmail}/>
    <input placeholder="Password" name="password" type="password" ref={enteredPassword}/>
    <input placeholder="Confirm Password" name="cPassword" type="password" onChange={checkPassword} ref={enteredConfirmPassword}/>
    <button className="form-btn signup-btn" type="submit">Sign up</button>
    </form>
    </>
  );
}

export default SignUp;
