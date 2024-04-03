import { useRef } from "react";
import axios from "axios";

import keys from "../../keys";

import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

function SignUp() {
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  const enteredConfirmPassword = useRef();
  const SignUpHandler = async (e) => {
    e.preventDefault();
    if (enteredPassword.current.value !== enteredConfirmPassword.current.value){
        alert("passwords do not match")
        return;
    }

    const obj = {
      email: enteredEmail.current.value,
      password: enteredPassword.current.value,
    };
    console.log({
      ...obj,
      returnSecureToken: true,
    });
    try {
      const res = await axios.post(`${keys.SignUpUrl}${keys.googleApiKey}`, {
        ...obj,
        returnSecureToken: true,
      });
      console.log("user has successfully signed up",res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const checkPassword = () => {
    // console.log("onchange")
    if (enteredConfirmPassword.current.value != enteredPassword.current.value) {
      console.log("not same");
    }
  };

  return (
    <Form onSubmit={SignUpHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          ref={enteredEmail}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={checkPassword}
          type="password"
          placeholder="Password"
          ref={enteredPassword}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={checkPassword}
          type="password"
          placeholder="Password"
          ref={enteredConfirmPassword}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SignUp;
