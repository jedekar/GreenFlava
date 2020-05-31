import React, { useRef, useState } from "react";
import "../App.css";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { GoogleLoginButton } from "react-social-login-buttons";

const socket = require("../globals/socket");

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {
        console.log(email);
        console.log(password);

        socket.emit("user.login", {
            password,
            email,
        });

        socket.on("user.login", ({ err, data }) => {
            if (err) {
                console.log("user.login.error", err);
                /*
                  TODO
                  call some fuction like showError(err);
                */
            } else {
                console.log("user.login.success", data);
                /*
                  TODO
                  1. Add some redirect to order
                  2. Save data.token to local store
                */
                localStorage.setItem("token", data.token);
                window.location.href = "/user-orders";
            }
        });
    };

    return (
        <Form className="login-form">
            <h1 class="mb-3">Welcome back!</h1>
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
            <Button
                onClick={handleSignIn}
                className="btn-lg btn-dark btn-block"
            >
                Sign In
            </Button>
            <div className="text-center pt-3">
                Or continue with your social account
            </div>
            <GoogleLoginButton className="mt-3 mb-3" />
            <div className="text-center">
                <a href="/sign-up">Sign Up</a>
                <span className="p-2">|</span>
                <a href="/forgot-password">Forgot password</a>
            </div>
        </Form>
    );
}

export default SignIn;
