// App.jsx
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import User from "./components/Users.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (token, userData) => {
    //Cookies.set("token", token);
    localStorage.setItem("userData", JSON.stringify(userData));
    setUserData(userData);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("userData");
    setLoggedIn(false);
  };

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUserData = localStorage.getItem("userData");
    const parsedUserData =
      storedUserData !== "undefined" ? JSON.parse(storedUserData) : null;

    if (
      storedToken !== "null" &&
      storedToken !== undefined &&
      storedToken &&
      parsedUserData
    ) {
      const decodedToken = jwtDecode(storedToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        toast.error("La sesión ha caducado.");
        handleLogout();
      } else {
        // Token válido, establece el estado loggedIn
        setLoggedIn(true);
        setUserData(parsedUserData);
      }
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                loggedIn={loggedIn}
                email={userData ? userData[0]?.email : null}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/user" element={<User />} />
          <Route path="/register" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
