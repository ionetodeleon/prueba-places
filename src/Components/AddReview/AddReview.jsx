import react, { useState } from 'react';

function AddReview(props) {
    const [reviewData, setReviewData] = useState({
        userId: sessionStorage.getItem('id'),
        rating: 0,
        review: '',
        placeId: props.placeId,
        foundId: props.foundId,
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewData({ ...reviewData, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://history-hunters-evening-api.onrender.com/reviews/add', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(reviewData),
            });
            if (!response.ok) {
              throw new Error('Error!');
            }
            const result = await response.json();
            console.log(result.data);
            props.onChange(true);
            alert('Review realizada');
          } catch (error) {
            console.error('Hubo un error al enviar la información', error);
            alert('Error al enviar la información');
          }
      }
      
    return (
    <form onSubmit={handleSubmit}>
    <h2>Deja tu review</h2>
    <input type="text" name="review" onChange={handleChange} placeholder="Comentario" />
    <input type="number" name="rating" onChange={handleChange} placeholder="Rating" />
    <button type="submit">Enviar</button>
    </form>
    );
}

export default AddReview;