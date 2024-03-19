import React, { useState } from 'react';
import styles from './AgregarLugar.module.css';

function AgregarLugar() {
  const [formData, setFormData] = useState({
    userId: sessionStorage.getItem('id'),
    name: '',
    description: '',
    address: '',
    images: [{ url: '' }],
    type: 'Belicos',
    characteristics: [],
    score: 0,
    country: 'Uruguay',
    region: 'Este'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://history-hunters-evening-api.onrender.com/places/add', {
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
    } else if (name === "characteristics") {
      setFormData({ ...formData, characteristics: value.split(',') });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2>Agregar Lugar</h2>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" className={styles.inputField} />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" className={styles.textareaField}></textarea>
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Dirección" className={styles.inputField} />
      <input type="text" name="images" value={formData.images[0].url} onChange={handleChange} placeholder="URL de la imagen" className={styles.inputField} />
      <input type="text" name="characteristics" onChange={handleChange} placeholder="Características separadas por coma" className={styles.inputField} />
      <input type="number" name="score" value={formData.score} onChange={handleChange} placeholder="Puntuación" className={styles.inputField} />
      
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

export default AgregarLugar;
