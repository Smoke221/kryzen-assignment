import React, { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={handleInputChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleInputChange}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
