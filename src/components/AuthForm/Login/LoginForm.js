import { authActions } from "../../store/auth";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// console.log(authActions)

import keys from "../../../keys";
import { useHistory } from "react-router";
import "./LoginForm.css";

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const dark = useSelector((state) => state.theme.dark);

  const history = useHistory();

  const forgotPsHandler = async (e) => {
    // const email = enteredEmail.current.value;
    const email = e.target.email.value;
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        `${keys.passwordReset}${keys.googleApiKey}`,
        {
          requestType: "PASSWORD_RESET",
          email,
        }
      );
      console.log("successfully sent password reset email", res.data);
    } catch (error) {
      console.log("error in forgot password", error);
    }
    setIsLoading(false);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

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
      // setidtoken(res.data.idToken);
      dispatch(authActions.login(res.data.idToken));

      history.replace("/profile");
    } catch (error) {
      console.log("signin error", error.response.data);
      alert(error.response.data.error.message);
    }
  };

  if (auth.idtoken) history.replace("/profile");
  return (
    <>
      {isLogin ? (
        <form
          className={`form login-form ${dark ? "bg-black text-white" : ""}`}
          onSubmit={loginHandler}
        >
          <h1 className="text-4xl">Login</h1>
          <input
            className="text-black"
            name="login"
            placeholder="Email"
            id="email"
          />
          <input
            className="text-black"
            name="password"
            placeholder="Password"
            type="password"
            id="password"
          />

          <div className="forgot-password">
            <button className="text-blue-600 underline ml-2" type="button" onClick={() => setIsLogin(false)}>Forgot password?</button>
          </div>
          <button className="form-btn login-btn" type="submit">
            Login
          </button>
        </form>
      ) : (
        <form
          className={`form forgot-ps ${dark ? "bg-black text-white" : ""}`}
          onSubmit={forgotPsHandler}
        >
          <h2 className="text-4xl" style={{ padding: "10px 0" }}>Account Recovery</h2>
          <h6>Enter the email with which you have registered.</h6>
          <input className="text-black" placeholder="Email" name="email" />
          <button className="form-btn forgotps-btn" type="submit">
            Send Link
          </button>
          <div className="forgot-password">
            Already a user?
            <button
              className="text-blue-600 underline ml-2"
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default LoginForm;
