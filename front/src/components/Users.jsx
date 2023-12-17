import React from "react";
import { useLocation } from "react-router-dom";

const User = () => {
  const location = useLocation();

  const userData = location?.state[0];

  return (
    <div>
      <h1>User Information</h1>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>User ID: {userData._id}</p>
          <p>Email: {userData.email}</p>
          {/* Otros datos del usuario */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default User;
