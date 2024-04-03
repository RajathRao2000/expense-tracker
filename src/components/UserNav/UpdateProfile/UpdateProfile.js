import React ,{useContext, useRef} from "react";
import axios from "axios";
import keys from "../../../keys";
import Global from "../../store/Global";

function UpdateProfile() {
    const enteredName=useRef()
    const enteredUrl=useRef()
    const {idtoken}=useContext(Global)
    console.log(idtoken)
    const updateHandler=async (e)=>{
        e.preventDefault()
        const fullName=enteredName.current.value
        const URL=enteredUrl.current.value
        if(!fullName || !URL) return
        try{const res=await axios.post(`${keys.updateProfile}${keys.googleApiKey}`,{
            idToken: idtoken,
            displayName: fullName,
            photoUrl: URL,
            returnSecureToken: true
        })
        console.log("profile update success",res.data)}
        catch(error){
            console.log("error in updateion",error.response.data)
        }

        
    }
  return (
    <form onSubmit={updateHandler}>
      <div className="form-header">
        <h2>Contact Details</h2>
        <button>Cancel</button>
      </div>
      <div className="input-group">
        <label>Full Name: </label>
        <input id="fullname" ref={enteredName}/>
        <label>Profile Photo URL</label>
        <input id="photoUrl" ref={enteredUrl}/>
      </div>
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateProfile;
