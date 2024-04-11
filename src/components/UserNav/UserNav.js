import React, { useContext } from "react";
import "./UserNav.css";
import { Route, useHistory, useLocation, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile/UserProfile";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import Global from "../store/Global";
import ExpenseTracker from "./ExpenseTracker/ExpenseTracker";
import { authActions } from "../store/auth";
import { useDispatch,useSelector } from "react-redux";
import { themeActions } from "../store/theme";

function UserNav() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();
  // const {clearToken}=useContext(Global)
  const theme=useSelector(state=>state.theme.dark)
  const logoutHandler = () => {
    // clearToken()
    dispatch(authActions.logout());
    history.replace("/login");
  };
  return (
    <>
      <div className={`user-header ${theme?"dark":""}`}>
        <button onClick={()=>dispatch(themeActions.toggle())}>{theme?"light":"dark"}</button>
        {pathname == `${path}/profile`
          ? "Welcome to Expense tracker!!!"
          : pathname == `${path}/update-profile`
          ? "Winners never quit, Quitters never win"
          : ""}
        <div className="logout-btn">
          <button onClick={logoutHandler}>Logout</button>
        </div>
        <div className="logout-btn">
          <button
            onClick={() => {
              history.replace("./expense-tracker");
            }}
          >
            Expense Tracker
          </button>
        </div>
        <div className="profile-msg">
          {pathname == `${path}/profile` ? (
            <p>
              "Your profile is incomplete."
              <Link to={`${path}/update-profile`}>Complete Now</Link>
            </p>
          ) : pathname == `${path}/update-profile` ? (
            <p>
              Your Profile is <strong>64%</strong> completed. A complete Profile
              has higher chances of landing a job
              <Link to={`${path}/profile`}>Go to Profile</Link>
            </p>
          ) : (
            ""
          )}
        </div>
      </div>

      <Route path={`${path}/profile`}>
        <UserProfile />
      </Route>
      <Route path={`${path}/update-profile`}>
        <UpdateProfile />
      </Route>
      <Route path={`${path}/expense-tracker`}>
        <ExpenseTracker />
      </Route>
    </>
  );
}

export default UserNav;
