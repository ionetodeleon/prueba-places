import React, { useState, useEffect } from 'react';
import styles from './AgregarObjeto.module.css';

function AgregarObjeto() {
    const [lugares, setLugares] = useState([]);
    const [formData, setFormData] = useState({
        userId: Number(sessionStorage.getItem('id')),
        placeId: 1,
        name: '',
        description: '',
        date: '',
        images: [{ url: '' }],
        type: 'Belicos',
        city: '',
        country: 'Uruguay',
        region: 'Este'
    });

    useEffect(() => {
        const loadData = async () => {
          const url = 'https://history-hunters-evening-api.onrender.com/places';
          
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Error al obtener los datos');
            }
            const result = await response.json();
            setLugares(result.data);
          } catch (error) {
            console.error('Error en la solicitud:', error);
          }
        };
    
        loadData();
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://history-hunters-evening-api.onrender.com/founds/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Error!');
            }
            const result = await response.json();
            console.log(result.data);
            alert('Información enviada correctamente');
        } catch (error) {
            console.error('Hubo un error al enviar la información', error);
            alert('Error al enviar la información');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "images") {
            setFormData({ ...formData, images: [{ url: value }] });
        } else if (name === "placeId") {
            setFormData({ ...formData, placeId: Number(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h2>Agregar Objeto</h2>
            <select name="placeId" value={formData.placeId} onChange={handleChange} className={styles.selectField}>
                {lugares.map((lugar) => (
                    <option value={lugar.id}>{lugar.name}</option>
                ))}
            </select>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" className={styles.inputField} />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" className={styles.textareaField}></textarea>
            <input type="text" name="images" value={formData.images[0].url} onChange={handleChange} placeholder="URL de la imagen" className={styles.inputField} />
            <input type="text" name="city" onChange={handleChange} placeholder="Ciudad" className={styles.inputField} />
            <input type="date" name="date" onChange={handleChange} placeholder="Fecha" className={styles.inputField} />

            <select name="type" value={formData.type} onChange={handleChange} className={styles.selectField}>
                <option value="Belicos">Bélicos</option>
                <option value="Cotidianos">Cotidianos</option>
                <option value="Otros">Otros</option>
            </select>

            <select name="country" value={formData.country} onChange={handleChange} className={styles.selectField}>
                <option value="Uruguay">Uruguay</option>
                <option value="Argentina">Argentina</option>
            </select>

            <select name="region" value={formData.region} onChange={handleChange} className={styles.selectField}>
                <option value="Este">Este</option>
                <option value="Sur">Sur</option>
            </select>
            <br />
            <button type="submit" className={styles.submitButton}>Enviar</button>
            <br />
            <br />
            <br />

        </form>
    );
}

export default AgregarObjeto;
