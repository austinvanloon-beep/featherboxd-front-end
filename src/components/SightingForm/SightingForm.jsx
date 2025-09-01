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
    image: '',  // Changed from imageUrl to image
  });

  useEffect(() => {
    const fetchSighting = async () => {
      const sightingData = await sightingService.show(sightingId);
      setFormData(sightingData);
    };

    if (sightingId) fetchSighting();

    return () =>
      setFormData({ title: '', text: '', location: '', category: 'Other', image: '' });
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
        <h1 className={styles.sightingTitle}>
          {sightingId ? 'Edit Sighting' : 'New Sighting'}
        </h1>
        <p className={styles.sightingMessage}>
          Please fill out the details below to report a new sighting.
        </p>
        <form onSubmit={handleSubmit} className={styles.sightingForm}>
          <div className={styles.formGroup}>
            <label htmlFor='title-input' className={styles.label}>Name <small>(An actual bird's name)</small></label>
            <input
              required
              type='text'
              name='title'
              id='title-input'
              className={styles.input}
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='text-input' className={styles.label}>Comments</label>
            <textarea
              required
              name='text'
              id='text-input'
              className={styles.input}
              value={formData.text}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='location-input' className={styles.label}>Location <small>(Be as specific as possible)</small></label>
            <input
              required
              type='text'
              name='location'
              id='location-input'
              className={styles.input}
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='category-input' className={styles.label}>Category</label>
            <select
              required
              name='category'
              id='category-input'
              className={styles.input}
              value={formData.category}
              onChange={handleChange}
            >
              <option value='Waterfowl'>Waterfowl</option>
              <option value='Perching'>Perching Bird</option>
              <option value='Raptors'>Raptors</option>
              <option value='Other'>Other</option>
            </select>
          </div>

          {/* Image URL input with 'image' as name */}
          <div className={styles.formGroup}>
            <label htmlFor='image-input' className={styles.label}>Image URL <small>(Must be valid URL)</small></label>
            <input
              type='url'
              name='image'
              id='image-input'
              className={styles.input}
              value={formData.image}
              onChange={handleChange}
              pattern="https?://.*\.(png|jpg|jpeg|gif)"
              placeholder='https://example.com/image.jpg'
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type='submit' className={`${styles.button} ${styles.primaryBtn}`}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SightingForm;






