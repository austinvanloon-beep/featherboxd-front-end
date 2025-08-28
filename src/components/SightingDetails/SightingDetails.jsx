import styles from './SightingDetails.module.css';

import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from 'react';

import CommentForm from "../CommentForm/CommentForm";

import * as sightingService from '../../services/sightingService';
import * as birdDataService from '../../services/birdDataService';

import { UserContext } from '../../contexts/UserContext';

const SightingDetails = (props) => {
  const [sighting, setSighting] = useState(null);
  const { user } = useContext(UserContext);
  const { sightingId } = useParams();
  const [info, setInfo] = useState({"origin": '', "size": '', "life_span": '', "habitat": ''});
  const [facts, setFacts] = useState([]);

  const fetchFactsData = async (sighting) => {
    const data = await birdDataService.show(`Generate 5 ${sighting.title} facts &facts=array of ${sighting.title} facts`);
    if (!data) {
      throw new Error("This feature is currently unavailable. Please try again later.")
    }

    setFacts(data.facts);
  };

  const fetchInfoData = async (sighting) => {
    const data = await birdDataService.show(`Generate information about ${sighting.title} &origin &size &life_span &habitat`);
    if (!data) {
      throw new Error("This feature is currently unavailable. Please try again later.")
    }
    
    setInfo({ ...data });
  }

  useEffect(() => {
    const fetchSighting = async () => {
      const sightingData = await sightingService.show(sightingId);
      setSighting(sightingData);
      fetchInfoData(sightingData);
      fetchFactsData(sightingData);
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
          <p>{sighting.title.toUpperCase()}</p>
          <p>Native To: {info.origin}</p>
          <p>Size: {info.size}</p>
          <p>Lifespan: {info.life_span}</p>
          <p>Habitat: {info.habitat}</p>
          <small>{sighting.category}</small>
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
        <h2>Facts about the {sighting.title}</h2>
        <ul>
          {facts.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
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
