import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  const { loggedIn, email, setLoggedIn } = props;

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={"buttonContainer"}>
        {loggedIn ? (
          <React.Fragment>
            <input
              className={"inputButton"}
              type="button"
              value="Log out"
              onClick={handleLogout}
            />
            <div>Your email address is {email}</div>
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
