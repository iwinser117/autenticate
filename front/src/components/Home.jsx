import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchSvg as fetchAvatar } from "../util";

const Home = (props) => {
  const [svgData, setSvgData] = useState("");
  const navigate = useNavigate();
  const { loggedIn, email, setLoggedIn } = props;

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
  };
 
  const fetchSvg = async () => {
    const stored = localStorage.getItem("userData");
    const name = email || (stored ? (JSON.parse(stored)[0]?.name || "") : "");
    const svg = await fetchAvatar(name);
    if (svg) setSvgData(svg);
  };

 
  useEffect(() => {
    fetchSvg();
  }, []);

  return (
    <div className="mainContainer">
      <div className="homeCard">
        <div className="homeTitle">Welcome!</div>
        <div className="homeSubtitle">Autentica para continuar</div>
        <div className={"buttonContainer"}>
          {loggedIn ? (
            <React.Fragment>
              <div>
                {svgData && <img src={svgData} alt="Avatar" className="avatar" />}
                <p className="subtitle">Hola {email}</p>
              </div>
              <button
                className={"inputButton"}
                type="button"
                onClick={handleLogout}
              >
                Log out
              </button>
            </React.Fragment>
          ) : (
            <div className="homeButtons">
              <Link to="/login">
                <button className={"inputButton"} type="button">Log in</button>
              </Link>
              <Link to="/register">
                <button className={"inputButton"} type="button">Sign Up</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
