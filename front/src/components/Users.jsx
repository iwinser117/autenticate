import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const User = () => {
  const location = useLocation();
  const userData =
    (location && location.state && location.state[0]) ||
    (localStorage.getItem("userData") &&
      JSON.parse(localStorage.getItem("userData"))[0]) ||
    null;
  let token = Cookies.get("token");

  function miFuncion() {
    if (!token) {
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
      return;
    }
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
      return;
    }
    setTimeout(miFuncion, 1000);
  }
  miFuncion();
  return (
    <div className="mainContainer">
      {userData && token ? (
        <div>
          <h1>User Information</h1>
          <p>Name: {userData.name}</p>
          <p>User ID: {userData._id}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <>
          <h1>Sin datos de Sesión</h1>
          <p>Redirigiendo a Pagina de Inicio</p>
        </>
      )}
    </div>
  );
};

export default User;
