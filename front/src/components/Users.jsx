import React from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const User = () => {
  const location = useLocation();
  const userData =
    (location && location.state && location.state[0]) ||
    (localStorage.getItem("userData") &&
      JSON.parse(localStorage.getItem("userData"))[0]) ||
    null;

  let token = Cookies.get("token");

  if (!token) {
    setTimeout(() => {
      toast.error("Por favor inicie sesión.");
    }, 1000);
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }

  return (
    <div>
      {userData && token ? (
        <div>
          <h1>User Information</h1>
          <p>Name: {userData.name}</p>
          <p>User ID: {userData._id}</p>
          <p>Email: {userData.email}</p>
          {/* Otros datos del usuario */}
        </div>
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
