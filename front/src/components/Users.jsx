import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
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
    try {
      let name = (userData && userData.name) || "";
      const response = await fetch(
        `https://ui-avatars.com/api/?name=${name}?format=svg&bold=true&rounded=true`
      );

      if (response.ok) {
        const svgText = URL.createObjectURL(await response.blob());
        setSvgData(svgText);
      } else {
        console.error("Error al obtener el SVG:", response.status);
      }
    } catch (error) {
      console.error("Error al obtener el SVG:", error);
    }
  };

  // Llama a la función para realizar la petición cuando el componente se monta
  useEffect(() => {
    fetchSvg();
  }, []);
  function cerrarSesion() {
    toast.error("Cerrando Sesión.");
    setTimeout(() => {
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
        <>
          <div>
            {svgData && <img src={svgData} alt="Avatar" className="avatar" />}
            <h1 className="titleContainer">User Information</h1>
            <p>Name: {userData.name}</p>
            <p>User ID: {userData._id}</p>
            <p>Email: {userData.email}</p>
          </div>
          <div className={"inputContainer"}>
            <input
              className={"inputButton"}
              type="button"
              value="Log out"
              onClick={() => {
                cerrarSesion();
              }}
            />
          </div>
        </>
      ) : (
        <>
          <h1>Sin datos de Sesión</h1>
          <p>Redirigiendo a Pagina de Inicio</p>
        </>
      )}
      <Toaster />
    </div>
  );
};

export default User;
