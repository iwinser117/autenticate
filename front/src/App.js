import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import User from "./components/Users.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const handleLogin = (token) => {
    // Implementa la lógica para manejar el inicio de sesión aquí
    console.log("Login successful, token:", token);
    // Puedes almacenar el token en el estado global, localStorage, etc.
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                email={email}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
