import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import keys from "../../../keys";
import Global from "../../store/Global";
import "./UpdateProfile.css";
import { useLocation } from "react-router";

function UpdateProfile() {
  const enteredName = useRef();
  const enteredUrl = useRef();
  const { idtoken } = useContext(Global);
  const [userInfo,setUserInfo]=useState({
    email:"",
    url:""
  })
  console.log(idtoken);

  const getProfileInfo = async () => {
    try {
      const res = await axios.post(
        `${keys.getProfileInfo}${keys.googleApiKey}`,
        {
          idToken: idtoken,
        }
      );
      console.log("success get", res.data.users[0]);
        setUserInfo(prev=>({
            email: res.data.users[0].email,
            url: res.data.users[0].photoUrl,
            name: res.data.users[0].displayName
        }))

    } catch (error) {
      console.log("user profile info get error", error);
    }
  };

  useEffect(()=>{
    getProfileInfo()
  },[])

  const updateHandler = async (e) => {

    e.preventDefault();
    const fullName = enteredName.current.value;
    const URL = enteredUrl.current.value;
    if (!fullName || !URL) return;
    try {
      const res = await axios.post(
        `${keys.updateProfile}${keys.googleApiKey}`,
        {
          idToken: idtoken,
          displayName: fullName,
          photoUrl: URL,
          returnSecureToken: true,
        }
      );
      console.log("profile update success", res.data);
    } catch (error) {
      console.log("error in updateion", error.response.data);
    }
  };
  return (
    <form className="contact-details" onSubmit={updateHandler}>
      <div className="form-header">
        <h2>Contact Details</h2>
        <button>Cancel</button>
      </div>
      <div className="update-input-group">
        <label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
            ></path>
          </svg>
          Full Name:{" "}
        </label>
        <input id="fullname" defaultValue={userInfo.name} ref={enteredName} />
        <label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m-26.37 144h52.74C149 186.34 140 202.87 128 215.89c-12-13.02-21-29.55-26.37-47.89M98 152a145.72 145.72 0 0 1 0-48h60a145.72 145.72 0 0 1 0 48Zm-58-24a87.61 87.61 0 0 1 3.33-24h38.46a161.79 161.79 0 0 0 0 48H43.33A87.61 87.61 0 0 1 40 128m114.37-40h-52.74C107 69.66 116 53.13 128 40.11c12 13.02 21 29.55 26.37 47.89m19.84 16h38.46a88.15 88.15 0 0 1 0 48h-38.46a161.79 161.79 0 0 0 0-48m32.16-16h-35.43a142.39 142.39 0 0 0-20.26-45a88.37 88.37 0 0 1 55.69 45M105.32 43a142.39 142.39 0 0 0-20.26 45H49.63a88.37 88.37 0 0 1 55.69-45M49.63 168h35.43a142.39 142.39 0 0 0 20.26 45a88.37 88.37 0 0 1-55.69-45m101.05 45a142.39 142.39 0 0 0 20.26-45h35.43a88.37 88.37 0 0 1-55.69 45"
            ></path>
          </svg>
          Profile Photo URL
        </label>
        <input id="photoUrl" defaultValue={userInfo.url} ref={enteredUrl} />
      </div>
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateProfile;
