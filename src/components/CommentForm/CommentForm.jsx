import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import * as sightingService from '../../services/sightingService';

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });

  const { sightingId, commentId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSighting = async () => {
      const sightingData = await sightingService.show(sightingId);
      setFormData(
        sightingData.comments.find((comment) => comment._id === commentId)
      );
    };
    if (sightingId && commentId) fetchSighting();
  }, [sightingId, commentId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (sightingId && commentId) {
      sightingService.updateComment(sightingId, commentId, formData);
      navigate(`/sightings/${sightingId}`);
    } else {
      props.handleAddComment(formData);
    }
    setFormData({ text: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='text-input'>Your comment:</label>
      <textarea
        required
        type='text'
        name='text'
        id='text-input'
        value={formData.text}
        onChange={handleChange}
      />
      <button type='submit'>SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;
