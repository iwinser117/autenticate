import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import toast, { Toaster } from "react-hot-toast";

const Login = ({ onLogin }) => {
  const location = useLocation();
  const rutaActual = location.pathname;
  const defaultUrl = "http://localhost:3007/api/";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateInput = () => {
    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Please enter your email");
      return false;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return false;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return false;
    }

    if (password.length < 3) {
      setPasswordError("The password must be 8 characters or longer");
      return false;
    }

    return true;
  };

  const onButtonClick = async () => {
    setEmailError("");
    setPasswordError("");

    if (!validateInput()) {
      return;
    }

    const data = { email, password };
    try {
      const loginResponse = await postJSON(data, "POST", "login");

      if (loginResponse.success) {
        const userResponse = await postJSON(
          null,
          "GET",
          "user",
          loginResponse.token
        );
        onLogin(null, userResponse.user);
        setTimeout(() => {
          navigate("/user", { state: userResponse.user });
        }, 1000);
        toast.success("Ingreso Exitoso.", {
          duration: 1000,
        });
      } else {
        Cookies.remove("token");

        toast.error("Correo o Contraseña incorrecta.");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const onClickCreate = async () => {
    setEmailError("");
    setPasswordError("");

    if (!validateInput()) {
      return;
    }

    const newData = {
      name,
      email,
      password,
    };

    try {
      const createResponse = await postJSON(newData, "POST", "register");

      if (createResponse.success) {
        toast.success("Registro creado exitosamente.", {
          duration: 1000,
        });
        setTimeout(() => {
          const data = [];
          data.push(createResponse.data);
          navigate("/user", { state: data });
        }, 1000);
      } else {
        createResponse?.message
          ? toast.error(createResponse.message)
          : toast.error("Error al crear el registro.");
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
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      if (metodo !== "GET") {
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
        {rutaActual === "/login" ? <div>Login</div> : <div>Create Record</div>}
      </div>
      <br />
      <div className="inputContainer">
        {!(rutaActual === "/login") ? (
          <>
            <label className="inputLabel">Name</label>
            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(ev) => setName(ev.target.value)}
              className={"inputBox"}
            />
          </>
        ) : null}
      </div>
      <br />
      <div className={"inputContainer"}>
        <label className="inputLabel">Email</label>
        <input
          type="text"
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <label className="inputLabel">Password</label>
        <input
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        {rutaActual === "/login" ? (
          <input
            className={"inputButton"}
            type="button"
            onClick={onButtonClick}
            value={"Log in"}
          />
        ) : (
          <input
            className={"inputButton"}
            type="button"
            onClick={onClickCreate}
            value={"Sing Up"}
          />
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
