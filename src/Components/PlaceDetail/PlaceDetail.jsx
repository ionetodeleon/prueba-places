import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import Reviews from "../Reviews/Reviews";
import AddReview from "../AddReview/AddReview";

function PlaceDetail() {
    const [lugar, setLugar] = useState(null);
    const [userName, setUserName] = useState('');
    const [reviews, setReviews] = useState([]);
    const [dejoReview, setDejoReview] = useState(false);
    const { placeId } = useParams();

    useEffect(() => {
        const loadData = async () => {
            const urlDetalle = 'https://history-hunters-evening-api.onrender.com/places/' + placeId;

            try {
                const response = await fetch(urlDetalle);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const result = await response.json();
                const userId = result.data?.userId;
                
                setLugar(result.data);
                
                if(userId){
                    const urlUserName = 'https://history-hunters-evening-api.onrender.com/users/profile/' + userId;

                    const response = await fetch(urlUserName);
                    if (!response.ok) {
                        throw new Error('Error al obtener los datos');
                    }
                    const result = await response.json();
                    const data = result.data;
                    
                    setUserName(data.name + " " + data.lastName);
                }

                const urlReviews = 'https://history-hunters-evening-api.onrender.com/reviews';
                const responseReviews = await fetch(urlReviews);
                if (!responseReviews.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const resultReviews = await responseReviews.json();
                const reviewsSinFiltrar = resultReviews.data;
                const reviewsParaEsteSitio = reviewsSinFiltrar.filter((review) => review.placeId === Number(placeId));

                setReviews(reviewsParaEsteSitio);
                setDejoReview(false);
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        loadData();
    }, [dejoReview]);

    return lugar ? (
        <>
        <div Style="margin: 50px;">
        <img src={lugar.images[0]?.url}></img>
        <h2>Nombre ---- {lugar.name}</h2>
        <p>Desc ---- {lugar.description}</p>
        <p>Direccion ---- {lugar.address}</p>
        <p>Ciudad ---- {lugar.location}</p>
        <p>Tipo ---- {lugar.type}</p>
        <p>Region ---- {lugar.region}</p>
        <p>Pais ---- {lugar.country}</p>
        <p>Puntuacion ---- {lugar.score}</p>
        <p>Subido por ---- <Link to={"/usuario/"+lugar.userId}>{userName}</Link></p>
        <br/>
        <br/>
        {reviews.length > 0 && (<Reviews reviews={reviews}/>)}
        <AddReview placeId={placeId} onChange={setDejoReview} />
        </div>
        </>
    ) : (<LoadingSpinner />)
}

export default PlaceDetail;