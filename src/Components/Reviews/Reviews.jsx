import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Reviews({ reviews }) {
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const userIds = reviews.map((review) => review.userId);
        const promises = userIds.map(userId =>
          fetch(`https://history-hunters-evening-api.onrender.com/users/profile/${userId}`)
            .then(response => response.json())
            .then(result => ({ userId, name: result.data.name + " " + result.data.lastName }))
        );
        const userData = await Promise.all(promises);
        const userNamesMap = {};
        userData.forEach(user => {
          userNamesMap[user.userId] = user.name;
        });
        setUserNames(userNamesMap);
      } catch (error) {
        console.error('Error fetching user names:', error);
      }
    };

    fetchUserNames();
  }, [reviews]);

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="review">
          <p>Review: {review.review}</p>
          <p>Rating: {renderStars(review.rating)}</p>
          <p>User ID: <Link to={`/usuario/${review.userId}`}>{userNames[review.userId]}</Link></p>
        </div>
      ))}
    </div>
  );
}

function renderStars(rating) {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<span key={i}>&#9733;</span>);
  }
  return stars;
}

export default Reviews;
