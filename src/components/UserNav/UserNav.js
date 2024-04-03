import React from "react";
import "./UserNav.css";
import { Route, useLocation, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile/UserProfile";
import UpdateProfile from "./UpdateProfile/UpdateProfile";

function UserNav() {
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();
  console.log(path, url);
  return (
    <>
      <div className="user-header">
        {pathname == `${path}/profile`
          ? "Welcome to Expense tracker!!!"
          : pathname == `${path}/update-profile`
          ? "Winners never quit, Quitters never win"
          : ""}{" "}
        <div className="profile-msg">
          {/* Your profile is incomplete. */}
          {pathname == `${path}/profile` ? (
            "Your profile is incomplete."
          ) : pathname == `${path}/update-profile` ? (
            <p >
              Your Profile is <strong>64%</strong> completed. A complete Profile
              has higher chances of landing a job
            </p>
          ) : (
            ""
          )}{" "}
          <Link to={`${path}/profile`}>Complete Now</Link>
        </div>
      </div>
      <Route path={`${path}/profile`}>
        <UserProfile />
      </Route>
      <Route path={`${path}/update-profile`}>
        <UpdateProfile />
      </Route>
    </>
  );
}

export default UserNav;
