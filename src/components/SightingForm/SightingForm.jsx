import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styles from './SightingForm.module.css';
import * as sightingService from '../../services/sightingService';

const SightingForm = (props) => {
  const { sightingId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    location: '',
    category: 'Other',
  });

  useEffect(() => {
    const fetchSighting = async () => {
      const sightingData = await sightingService.show(sightingId);
      setFormData(sightingData);
    };

    if (sightingId) fetchSighting();

    return () =>
      setFormData({ title: '', text: '', location: '', category: 'Other' });
  }, [sightingId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (sightingId) {
      props.handleUpdateSighting(sightingId, formData);
    } else {
      props.handleAddSighting(formData);
    }
  };

  return (
    <main className={styles.sightingMain}>
      <div className={styles.sightingFormWrapper}>
        <h1>{sightingId ? 'Edit Sighting' : 'New Sighting'}</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title-input'>Name</label>
          <input
            required
            type='text'
            name='title'
            id='title-input'
            value={formData.title}
            onChange={handleChange}
          />
          <label htmlFor='text-input'>Text</label>
          <textarea
            required
            type='text'
            name='text'
            id='text-input'
            value={formData.text}
            onChange={handleChange}
          />
          <label htmlFor='location-input'>Location</label>
          <input
            required
            type='text'
            name='location'
            id='location-input'
            value={formData.location}
            onChange={handleChange}
          />
          <label htmlFor='image-input'>Image</label>
          <input
            type='text'
            name='image'
            id='image-input'
            value={formData.image}
            onChange={handleChange}
            pattern='https?://.*\.(png|jpg|jpeg|gif)'
          />
          <label htmlFor='category-input'>Category</label>
          <select
            required
            name='category'
            id='category-input'
            value={formData.category}
            onChange={handleChange}
          >
            <option value='Waterfowl'>Waterfowl</option>
            <option value='Perching'>Perching Bird</option>
            <option value='Raptors'>Raptors</option>
            <option value='Other'>Other</option>
          </select>
          <button type='submit'>SUBMIT</button>
        </form>
      </div>
    </main>
  );
};

export default SightingForm;
