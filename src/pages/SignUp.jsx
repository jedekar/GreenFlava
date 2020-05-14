import React, { useState } from "react";
import "../App.css";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    
  const handleSignUp = () => {
    console.log(username);
    console.log(email);
    console.log(password);
  };  

  return (
    <Form className="login-form">
      <h1 class="mb-3">Hello, friend!</h1>
      <FormGroup>
        <Label>User name</Label>
        <Input
          onChange={(e) => setUsername(e.target.value)}
          type="username"
          placeholder="Username"
         />
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
         />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </FormGroup>
      <Button onClick={handleSignUp} className="btn-lg btn-dark btn-block">Sign Up</Button>
    </Form>
  );
};

export default SignUp;
