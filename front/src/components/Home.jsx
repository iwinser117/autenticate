import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = (props) => {
  const { loggedIn, email, setLoggedIn } = props;
  const navigate = useNavigate();
  const onButtonClick = () => {
    if (loggedIn) {
        console.log(loggedIn)
    } else {
        navigate("/login")
        console.log(loggedIn)
    }
  };
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
          <Link to="/login">
            <input className={"inputButton"} type="button" value="Log in" />
          </Link>
        )}
      </div>  
    </div>
  );
};

export default Home;
