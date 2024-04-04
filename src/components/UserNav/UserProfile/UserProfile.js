import React, { useContext, useState } from "react";
import axios from "axios";

import "./UserProfile.css";
import keys from "../../../keys";
import Global from "../../store/Global";

function UserProfile() {

  const {idtoken}=useContext(Global)
  console.log(idtoken)

  const verifyEmail = async () => {
    try {
      const res = await axios.post(`${keys.verifyEmail}${keys.googleApiKey}`,{
        requestType: "VERIFY_EMAIL",
        idToken: idtoken
      });
      console.log("verification sent!", res.data);
    } catch (error) {
      console.log("error in email verification", error.response.data.error);
      alert(error.response.data.error.message)
    }
  };
  return (
    <section className="user-profile">
      <button onClick={verifyEmail}>Verify Email ID</button>
    </section>
  );
}

export default UserProfile;
