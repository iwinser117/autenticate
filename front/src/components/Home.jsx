import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    let name = email || "";
    if (!email) {
      const dataLocal = (localStorage.getItem("userData") &&
      JSON.parse(localStorage.getItem("userData"))[0])
      name = dataLocal ? dataLocal.name : ''
    }
    try {
      if(!name){
        return
      }
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

 
  useEffect(() => {
    fetchSvg();
  }, []);

  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={"buttonContainer"}>
        {loggedIn ? (
          <React.Fragment>
            
            <div>
              {svgData && <img src={svgData} alt="Avatar" className="avatar" />}
              <p>Hello {email}</p>
            </div>
            <input
              className={"inputButton"}
              type="button"
              value="Log out"
              onClick={handleLogout}
            />
          </React.Fragment>
        ) : (
          <>
            <Link to="/login">
              <input className={"inputButton"} type="button" value="Log in" />
            </Link>
            O
            <Link to="/register">
              <input className={"inputButton"} type="button" value="Sing Up" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
