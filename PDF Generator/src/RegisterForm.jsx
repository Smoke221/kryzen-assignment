import React, { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        onChange={handleInputChange}
      />
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterForm;
