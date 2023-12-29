import React from 'react';
import { RiLoginCircleLine, RiUserAddLine } from 'react-icons/ri'; 
import { useNavigate } from 'react-router-dom';

const BotonNavegacion = ({ rutaObjetivo }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(rutaObjetivo);
  };

  return (
    <button className="botonNavegacion" onClick={handleRedirect}>
      {rutaObjetivo === '/login' ? <><RiLoginCircleLine /> Login</> : <><RiUserAddLine /> Create </> }
    </button>
  );
};

export default BotonNavegacion;
