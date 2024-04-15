import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import keys from "../../../keys";

function VerifyEmail() {
  const auth = useSelector((state) => state.auth);
  const dark = useSelector((state) => state.theme.dark);

  const verifyEmail = async () => {
    try {
      const res = await axios.post(`${keys.verifyEmail}${keys.googleApiKey}`, {
        requestType: "VERIFY_EMAIL",
        idToken: auth.idtoken,
      });
      console.log("verification sent!", res.data);
      alert("Verification Sent! Please check your E-mail")
    } catch (error) {
      console.log("error in email verification", error.response.data.error);
      alert(error.response.data.error.message);
    }
  };
  return (
    <section
      className={`verify-email-section flex justify-center items-center h-full`}
    >
      <button
        className={`border-2 p-3 rounded ${dark ? "bg-black text-white" : ""}`}
        onClick={verifyEmail}
      >
        Verify Email ID
      </button>
    </section>
  );
}

export default VerifyEmail;
