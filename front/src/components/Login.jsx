import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import toast, { Toaster } from "react-hot-toast";
import BotonNavegacion from './BotonNavegacion';
import { apiRequest, validateEmail, validatePassword, setAuthToken } from "../util";

const Login = ({ onLogin }) => {
  const location = useLocation();
  const rutaActual = location.pathname;
  // UI state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInput = () => {
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    setEmailError(emailErr || "");
    setPasswordError(passErr || "");
    return !emailErr && !passErr;
  };

  const onButtonClick = async () => {
    if (loading) return;
    setEmailError("");
    setPasswordError("");

    if (!validateInput()) return;

    setLoading(true);
    const data = { email, password };
    try {
      const loginResponse = await apiRequest({ endpoint: "login", method: "POST", data });
      if (loginResponse?.success) {
        const userResponse = await apiRequest({ endpoint: "user", method: "GET", token: loginResponse.token });
        localStorage.setItem("userData", JSON.stringify(userResponse.user));
        setAuthToken(loginResponse.token);
        onLogin(loginResponse.token, userResponse.user);
        toast.success("Ingreso exitoso", { duration: 1000 });
        navigate("/user", { state: userResponse.user });
      } else {
        Cookies.remove("token");
        toast.error(loginResponse?.message || "Correo o contraseña incorrecta");
      }
    } catch (error) {
      toast.error("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };
  const onClickCreate = async () => {
    if (loading) return;
    setEmailError("");
    setPasswordError("");

    const emailValid = validateEmail(email);
    const passValid = validatePassword(password);
    const nameValid = (name && name.trim().length >= 2) ? null : "Ingresa tu nombre";
    setEmailError(emailValid || "");
    setPasswordError(passValid || "");
    if (nameValid) toast.error(nameValid);
    if (emailValid || passValid || nameValid) return;

    setLoading(true);
    const newData = { name, email, password };
    try {
      const createResponse = await apiRequest({ endpoint: "register", method: "POST", data: newData });
      if (createResponse?.success) {
        toast.success("Registro creado exitosamente", { duration: 1000 });
        const userResponse = await apiRequest({ endpoint: "user", method: "GET", token: createResponse.token });
        localStorage.setItem("userData", JSON.stringify(userResponse.user));
        setAuthToken(createResponse.token);
        navigate("/user", { state: userResponse.user });
      } else {
        toast.error(createResponse?.message || "Error al crear el registro");
      }
    } catch (error) {
      toast.error("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // postJSON replaced with reusable apiRequest in util

  return (
    <div className={"mainContainer"}>
      <BotonNavegacion rutaObjetivo={rutaActual === '/login' ? '/register' : '/login'} />
      <div className="authCard">
        <div className={"titleContainer"}>
          {rutaActual === "/login" ? "Bienvenido" : "Crear cuenta"}
        </div>
        <div className="subtitle">
          {rutaActual === "/login"
            ? "Ingresa con tu correo y contraseña"
            : "Completa los datos para registrarte"}
        </div>

        {rutaActual !== "/login" ? (
          <div className="inputContainer">
            <label className="inputLabel">Name</label>
            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(ev) => setName(ev.target.value)}
              className={"inputBox"}
            />
          </div>
        ) : null}

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

        <div className={"buttonContainer"}>
          {rutaActual === "/login" ? (
            <button className={"inputButton"} type="button" onClick={onButtonClick} disabled={loading}>
              {loading ? "Ingresando..." : "Log in"}
            </button>
          ) : (
            <button className={"inputButton"} type="button" onClick={onClickCreate} disabled={loading}>
              {loading ? "Creando..." : "Sign Up"}
            </button>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
