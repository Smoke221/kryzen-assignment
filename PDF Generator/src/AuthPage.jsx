import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const AuthPage = () => {
    return (
        <div>
            <RegisterForm />
            <LoginForm />
        </div>
    )
}

export default AuthPage;