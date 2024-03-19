import React, { useState, useEffect } from 'react';
import Found from './Components/Found';
import './Founds.css';
import { Link } from 'react-router-dom';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

function Founds({ searchTerm }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const baseUrl = 'https://history-hunters-evening-api.onrender.com/founds';
      const url = searchTerm
        ? `${baseUrl}/search/key?name=${(searchTerm)}`
        : baseUrl;
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const result = await response.json();
        setData(result.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error en la solicitud:', error);
      }
    };

    loadData();
  }, [searchTerm]);

  return isLoading ?(<LoadingSpinner />) : (
    <div className='card-container'>
    {data.map((found) => (
      <Link class='link-router' to={`/objetos/`+ found.id}>
        <Found
        key={found.id}
        imageUrl={found.images}
        name={found.name}
        description={found.description}
      />
      </Link>
    ))}
  </div>
)
}

export default Founds;
