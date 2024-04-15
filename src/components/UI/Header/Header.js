import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";

import { authActions } from "../../store/auth";
import { themeActions } from "../../store/theme";

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const dark = useSelector((state) => state.theme.dark);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/login");
  };
  return (
    <>
      <header
        className={`${
          dark ? "dark" : ""
        } border-solid border-2 border-b-black p-2 flex justify-between h-16 items-center`}
      >
        <p className="text-xl">
          {pathname === `/profile`
            ? "Welcome to Expense tracker!!!"
            : pathname === `/update-profile`
            ? "Winners never quit, Quitters never win"
            : "Welcome to Expense tracker!!!"}
        </p>
        {isAuthenticated && (
          <>
            <nav
              className={`p-2 flex gap-3 justify-self-center [&>a]:${dark?`bg-white`:``}`}
            >
              {/* <nav
                className={`p-2 flex gap-3 justify-self-center [&>*]:${
                  dark ? `border-white` : `bg-black`
                } `}
              >*/}
              <NavLink activeClassName={`border-b-4`} to={`/expense-tracker`}>
                Expense Tracker
              </NavLink>
              <NavLink activeClassName="border-b-4 " to={`/verify-email`}>
                Verify Email
              </NavLink>
              <NavLink activeClassName="border-b-4 " to={`/profile`}>
                Profile
              </NavLink>
            </nav>
          </>
        )}
        <div
          className={`nav-btn-group flex  items-center justify-center [&>button]:border-2 [&>button]:p-2 gap-1`}
        >
          {pathname !== "/login" && (
            <div
              className={`profile-msg p-2  italic text-xs w-72 rounded ${
                dark ? "bg-white text-black" : "bg-black text-white"
              } flex`}
            >
              {pathname !== `/update-profile` ? (
                <p>
                  Your profile is incomplete.
                  <Link
                    to={`/update-profile`}
                    className={`block font-semibold text-purple-800 mt-1`}
                  >
                    Complete Now
                  </Link>
                </p>
              ) : (
                <p>
                  Your Profile is <strong>64%</strong> completed. A complete
                  Profile has higher chances of landing a job.
                  {/* <Link
                    to={`/profile`}
                    className={`block font-semibold text-purple-800 mt-1`}
                  >
                    Go to Profile
                  </Link> */}
                </p>
              )}
            </div>
          )}

          <button onClick={() => dispatch(themeActions.toggle())}>
            {dark ? (
              <span title="Light">
                <MdLightMode size={25} style={{ color: "yellow" }} />
              </span>
            ) : (
              <span title="Dark">
                <MdDarkMode size={25} />
              </span>
            )}
          </button>
          {isAuthenticated && (
            <button title="Logout" onClick={logoutHandler}>
              <FaSignOutAlt size={25} />
            </button>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
