import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import * as sightingService from '../../services/sightingService';

const SightingForm = (props) => {
  const { sightingId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'Species',
  });

  useEffect(() => {
    const fetchSighting = async () => {
      const sightingData = await sightingService.show(sightingId);
      setFormData(sightingData);
    };

    if (sightingId) fetchSighting();

    return () => setFormData({ title: '', text: '', category: 'Other' });
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
    <main>
      <h1>{sightingId ? 'Edit Sighting' : 'New Sighting'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title-input'>Title</label>
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
    </main>
  );
};

export default SightingForm;

