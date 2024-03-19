import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import Reviews from "../Reviews/Reviews";
import AddReview from "../AddReview/AddReview";

function FoundsDetail() {
    const [found, setFound] = useState(null);
    const [userName, setUserName] = useState('');
    const [reviews, setReviews] = useState([]);
    const [dejoReview, setDejoReview] = useState(false);
    const { foundId } = useParams();

    useEffect(() => {
        const loadData = async () => {
            const urlDetalle = 'https://history-hunters-evening-api.onrender.com/founds/' + foundId;

            try {
                const response = await fetch(urlDetalle);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const result = await response.json();
                const userId = result.data?.userId;
                
                setFound(result.data);
                
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
                const reviewsParaEsteSitio = reviewsSinFiltrar.filter((review) => review.foundId === Number(foundId));

                setReviews(reviewsParaEsteSitio);
                setDejoReview(false);
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        loadData();
    }, [dejoReview]);

    return found ? (
        <>
        <div Style="margin: 50px;">
        <img src={found.images[0]?.url}></img>
        <h2>Nombre ---- {found.name}</h2>
        <p>Desc ---- {found.description}</p>
        <p>Fecha ---- {new Date(found.date).toLocaleDateString()}</p>
        <p>Tipo ---- {found.type}</p>
        <p>Region ---- {found.region}</p>
        <p>Pais ---- {found.country}</p>
        <p>Subido por ---- <Link to={"/usuario/"+found.userId}>{userName}</Link></p>
        <br/>
        <br/>
        {reviews.length > 0 && (<Reviews reviews={reviews}/>)}
        <AddReview foundId={foundId} onChange={setDejoReview} />
        </div>
        </>
    ) : (<LoadingSpinner />)
}

export default FoundsDetail;