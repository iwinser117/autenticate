import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
    if (loggedIn) {
        localStorage.removeItem("user")
        props.setLoggedIn(false)
    } else {
        navigate("/login")
    }

  };

  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={"buttonContainer"}>
        {loggedIn ? (
          <Link to="/logout">
            <input className={"inputButton"} type="button" value="Log out" />
          </Link>
        ) : (
          <Link to="/login">
            <input className={"inputButton"} type="button" value="Log in" />
          </Link>
        )}
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </div>
  );
};

export default Home;
