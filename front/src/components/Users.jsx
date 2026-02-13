import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { fetchSvg as fetchAvatar, clearAuth } from "../util";
import toast, { Toaster } from "react-hot-toast";

const User = ({ handleLogout }) => {
  const [svgData, setSvgData] = useState("");
  const location = useLocation();
  const userData =
    (location && location.state && location.state[0]) ||
    (localStorage.getItem("userData") &&
      JSON.parse(localStorage.getItem("userData"))[0]) ||
    null;
  let token = Cookies.get("token");

  const fetchSvg = async () => {
    const svg = await fetchAvatar(userData?.name || "");
    if (svg) setSvgData(svg);
  };

  // Llama a la función para realizar la petición cuando el componente se monta
  useEffect(() => {
    let isActive = true;
    let currentUrl = "";

    const loadAvatar = async () => {
      const svg = await fetchAvatar(userData?.name || "");
      if (!isActive) return;
      if (svg) {
        currentUrl = svg;
        setSvgData(svg);
      }
    };

    loadAvatar();

    return () => {
      isActive = false;
      if (currentUrl) URL.revokeObjectURL(currentUrl);
    };
  }, [userData?.name]);
  function cerrarSesion() {
    toast.error("Cerrando Sesión.");
    setTimeout(() => {
      clearAuth();
      handleLogout();
    }, 1000);
  }

  function miFuncion() {
    if (!userData) {
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
      return;
    }
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        clearAuth();
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
        return;
      }
    }
    setTimeout(miFuncion, 1000);
  }
  miFuncion();
  return (
    <div className="mainContainer">
      {userData ? (
        <div className="userCard">
          {svgData && <img src={svgData} alt="Avatar" className="avatar" />}
          <h1 className="titleContainer">User Information</h1>
          <div className="userMeta">
            <p>Name: {userData.name}</p>
            <p>User ID: {userData._id}</p>
            <p>Email: {userData.email}</p>
          </div>
          <div className={"buttonContainer"}>
            <button
              className={"inputButton"}
              type="button"
              onClick={() => {
                cerrarSesion();
              }}
            >
              Log out
            </button>
          </div>
        </div>
      ) : (
        <div className="userCard">
          <h1 className="titleContainer">Sin datos de sesión</h1>
          <p className="subtitle">Redirigiendo a pagina de inicio</p>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default User;
