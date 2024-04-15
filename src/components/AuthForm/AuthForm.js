import React from "react";
import LoginForm from "./Login/LoginForm";
import SignUp from "./SignUp/SignUp";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import "./AuthForm.css";

function AuthForm() {
  console.log(JSON.parse(localStorage.getItem("token")));

  const history = useHistory();
  return (
    <section className="auth-form p-5 ">
      {history.location.pathname === "/login" && <LoginForm />}
      {history.location.pathname === "/signup" && <SignUp />}
      <div className="form-msg ">
        {history.location.pathname === "/login" && (
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        )}
        {history.location.pathname === "/signup" && (
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
        )}
      </div>
    </section>
  );
}

export default AuthForm;
