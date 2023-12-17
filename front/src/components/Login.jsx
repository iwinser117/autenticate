import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const defaultUrl = "http://localhost:3007/api/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const onButtonClick = async () => {
    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 3) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    const data = { email, password };
    try {
      const loginResponse = await postJSON(data, 'POST', 'login');

      if (loginResponse.success) {
        // Almacena dinámicamente el token en el estado
        onLogin(loginResponse.token);

        console.log("Login successful!");

        const userResponse = await postJSON(null, 'GET', 'user', loginResponse.token);
        navigate("/user", { state: userResponse.user });
      } else {
        console.log(loginResponse.error); 
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  async function postJSON(data, metodo, endpoint, token) {
    try {
      const url = endpoint ? `${defaultUrl}${endpoint}` : defaultUrl;

      const requestOptions = {
        method: metodo,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      };

      if (metodo !== 'GET') {
        requestOptions.body = JSON.stringify(data);
      }

      const response = await fetch(url, requestOptions);
      const result = await response.json();

      return result;
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
      </div>
    </div>
  );
};

export default Login;
