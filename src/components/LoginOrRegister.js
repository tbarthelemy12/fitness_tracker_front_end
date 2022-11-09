import React, { useState } from "react";
import { useAuth } from "../custom-hooks";
import { useHistory } from "react-router-dom";

export default function LoginOrRegister() {
  const history = useHistory();

  const { updateAuthStatus } = useAuth();

  const currentURL = window.location.href;
  const loginOrRegister = currentURL.slice(22);
  

  const [form, setForm] = useState({ username: "", password: "" });

  async function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${loginOrRegister}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const { user, token } = await response.json();

      if (user) {
        localStorage.ft_token = token;
        updateAuthStatus();
      
        history.push("./myroutines");
      } else {
        window.alert(
          "Please enter a valid username and/or password combination."
        );
        throw new Error(`error with user action, ${loginOrRegister}`);
      }
    } catch (error) {
      window.alert(
        "Oops, something went wrong! Please ensure you've entered a valid username and/or password combination."
      );
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="userInfoInputs">
      <div className="usernameInput">
        <label style={{ marginRight: 5 + "px" }}>
          {loginOrRegister === "register" && "Choose "}Username:
        </label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
      </div>
      <div className="passwordInput">
        <label style={{ marginRight: 5 + "px" }}>
          {loginOrRegister === "register" && "Choose "}Password:
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginBottom: 10 + "px" }}>
        {loginOrRegister === "register" &&
          "Password must be at least 8 characters in length."}
      </div>
      <input
        type="submit"
        value={loginOrRegister === "register" ? "Register" : "Login"}
        className="loginRegButton"
      />
    </form>
  );
}