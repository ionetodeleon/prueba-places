import React, { useState, useEffect } from 'react';
import Place from './Components/Place';
import './Places.css';
import { Link } from 'react-router-dom';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

function Places({ searchTerm }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const baseUrl = 'https://history-hunters-evening-api.onrender.com/places';
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
    {data.map((place) => (
      <Link class='link-router' to={`/lugares/`+ place.id}>
        <Place
        key={place.id}
        imageUrl={place.images}
        name={place.name}
        description={place.description}
      />
      </Link>
    ))}
  </div>
)
}

export default Places;
