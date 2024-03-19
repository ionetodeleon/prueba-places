import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AgregarLugar from './Components/AgregarLugar/AgregarLugar';
import AgregarObjeto from './Components/AgregarObjeto/AgregarObjeto';

function Usuario() {
  const { userId } = useParams(); 
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const perfilPropio = userId === sessionStorage.getItem('id'); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://history-hunters-evening-api.onrender.com/users/profile/${userId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }
        const result = await response.json();
        setUserData(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!userData) {
    return <div>No se encontraron datos para este usuario</div>;
  }

  return (
    <div className="user-profile">
      <h2>Perfil de Usuario</h2>
      <p>Nombre: {userData.name}</p>
      <p>Apellido: {userData.lastName}</p>
      <br />
      {perfilPropio && (<AgregarLugar />)}
      {perfilPropio && (<AgregarObjeto />)}
    </div>
  );
}

export default Usuario;
