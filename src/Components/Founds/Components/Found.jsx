import React from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import './Found.css';
function Found(props) {
    return (
        <Card className="card-item">
            <div className="card-image-container">
                {props.imageUrl.length > 1 ? (
                    <Carousel style={{ height: '15rem' }}>
                        {props.imageUrl.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={image?.url}
                                    alt={`Slide ${index}`}
                                    style={{ maxHeight: '15rem', objectFit: 'cover' }}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <Card.Img
                        variant="top"
                        src={props.imageUrl[0]?.url}
                        alt={props.name}
                        style={{ maxHeight: '15rem', objectFit: 'cover' }}
                    />
                )}
            </div>
            <Card.Body className="card-text-container">
                <div>
                    <Card.Title> <span style={{ fontWeight: 'bold' }}>Nombre:</span> {props.name}</Card.Title>
                    <Card.Text> <span style={{ fontWeight: 'bold' }}>Descripción:</span> {props.description}</Card.Text>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Found;
