import { useContext, useRef, useState } from "react";
import axios from "axios";

import keys from "../../../keys";
import { useHistory } from "react-router";
import Global from "../../store/Global";
import "./LoginForm.css";
import { Link } from "react-router-dom";

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  const { setidtoken,idtoken } = useContext(Global);

  const forgotPsHandler = async (e) => {
    const email = enteredEmail.current.value;
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(`${keys.passwordReset}${keys.googleApiKey}`,{
        requestType: "PASSWORD_RESET",
        email: email
      });
      console.log("successfully sent password reset email", res.data);
    } catch (error) {
      console.log("error in forgot password", error);
    }
    setIsLoading(false);
  };

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
      localStorage.setItem(
        "token",
        JSON.stringify({
          token: res.data.idToken,
          email: res.data.email,
          date: new Date(),
        })
      );
      setidtoken(res.data.idToken);

      history.replace("/user-nav/profile");
    } catch (error) {
      console.log("signin error", error.response.data);
      alert(error.response.data.error.message);
    }
  };
  return (
    <>
      {isLogin ? (
        <form className="form login-form" onSubmit={loginHandler}>
          <h1>Login</h1>
          <input placeholder="Email" id="email" ref={enteredEmail} />
          <input
            placeholder="Password"
            type="password"
            id="password"
            ref={enteredPassword}
          />
          <div className="forgot-password">
            <button onClick={() => setIsLogin(false)}>Forgot password?</button>
          </div>
          <button className="form-btn login-btn" type="submit">
            Login
          </button>
        </form>
      ) : (
        <form className="form forgot-ps">
          <h2 style={{ padding: "10px 0" }}>Account Recovery</h2>
          <h6>Enter the email with which you have registered.</h6>
          <input placeholder="Email" ref={enteredEmail}/>
          <button className="form-btn forgotps-btn" onClick={forgotPsHandler}>
            Send Link
          </button>
          <div className="forgot-password">
            Already a user?<button onClick={() => setIsLogin(true)}>Login</button>
          </div>
        </form>
      )}
    </>
  );
}

export default LoginForm;
