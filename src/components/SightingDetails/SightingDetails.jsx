import styles from './SightingDetails.module.css';

import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from 'react';

import CommentForm from "../CommentForm/CommentForm";

import * as sightingService from '../../services/sightingService';

import { UserContext } from '../../contexts/UserContext';

const SightingDetails = (props) => {
  const [sighting, setSighting] = useState(null);
  const { user } = useContext(UserContext);
  const { sightingId } = useParams();

  useEffect(() => {
    const fetchSighting = async () => {
      const sightingData = await sightingService.show(sightingId);
      setSighting(sightingData);
    };

    fetchSighting();
  }, [sightingId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await sightingService.createComment(sightingId, commentFormData);
    setSighting({ ...sighting, comments: [...sighting.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    await sightingService.deleteComment(sightingId, commentId);
    setSighting({
      ...sighting,
      comments: sighting.comments.filter((comment) => comment._id !== commentId),
    });
  };

  if (!sighting) return <main>Loading...</main>;

  return (
    <main className={styles.container}>
      <section>
        <header>
          <p>{sighting.category.toUpperCase()}</p>
          <h1>{sighting.title}</h1>
          <div>
            <p>
              {`${sighting.author.username} posted on
              ${new Date(sighting.createdAt).toLocaleDateString()}`}
            </p>
            {sighting.author._id === user._id && (
              <>
                <Link to={`/sightings/${sightingId}/edit`}>Edit</Link>
                <button onClick={() => props.handleDeleteSighting(sightingId)}>Delete</button>
              </>
            )}
          </div>
        </header>
        <p>{sighting.text}</p>
      </section>
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!sighting.comments.length && <p>There are no comments.</p>}

        {sighting.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <div>
                <p>
                  {`${comment.author.username} posted on
                  ${new Date(comment.createdAt).toLocaleDateString()}`}
                </p>
                {comment.author._id === user._id && (
                  <>
                    <Link to={`/sightings/${sightingId}/comments/${comment._id}/edit`}>Edit</Link>
                    <button onClick={() => handleDeleteComment(comment._id)}>
                      Delete Comment
                    </button>
                  </>
                )}
              </div>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default SightingDetails;
