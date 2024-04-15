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
  const premium=useSelector(state=>state.theme.premium)
  const { isAuthenticated } = useSelector((state) => state.auth);
  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/login");
  };
  return (
    <>
      <header
        className={`${
          dark ? "dark" : "bg-blue-50"
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
              className={`p-2 flex gap-3 justify-self-center [&>a]:${dark?`bg-white`:`bg-green-500`}`}
            >
              <NavLink activeClassName={`border-b-4 ${dark?`border-white`:`border-black`}`} to={`/expense-tracker`}>
                Expense Tracker
              </NavLink>
              <NavLink activeClassName={`border-b-4 ${dark?`border-white`:`border-black`}`} to={`/verify-email`}>
                Verify Email
              </NavLink>
              <NavLink activeClassName={`border-b-4 ${dark?`border-white`:`border-black`}`} to={`/profile`}>
                Profile
              </NavLink>
            </nav>
          </>
        )}
        <div
          className={`nav-btn-group flex  items-center justify-center [&>button]:border-2 [&>button]:p-2 gap-1`}
        >
          {(pathname !== "/login" && pathname!=="/signup") && (
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

                </p>
              )}
            </div>
          )}

          {premium && <button onClick={() => dispatch(themeActions.toggle())}>
            {dark ? (
              <span title="Light">
                <MdLightMode size={25} style={{ color: "yellow" }} />
              </span>
            ) : (
              <span className="bg-white" title="Dark">
                <MdDarkMode size={25} />
              </span>
            )}
          </button>}
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
