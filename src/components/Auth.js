import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

import classes from "./Auth.module.css";

const Auth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuthenticated);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(authActions.login());
  };

  return (
    <>
      <main className={classes.auth}>
        <section>
          {!auth ? (
            <form onSubmit={handleLogin}>
              <div className={classes.control}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" />
              </div>
              <div className={classes.control}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
              </div>
              <button>Login</button>
            </form>
          ) : (
            <h1>My User Profile</h1>
          )}
        </section>
      </main>
    </>
  );
};

export default Auth;
