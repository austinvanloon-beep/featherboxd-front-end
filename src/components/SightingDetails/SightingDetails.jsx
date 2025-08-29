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
  const [info, setInfo] = useState([]);
  const [facts, setFacts] = useState([]);

  const fetchFactsData = async (sighting) => {
    const data = await birdDataService.showFacts(`Generate 5 ${sighting.title} facts &facts=array of ${sighting.title} facts`);
    if (!data) {
      throw new Error("This feature is currently unavailable. Please try again later.")
    }

    setFacts(data.facts);
  };

  const fetchInfoData = async (sighting) => {
    const data = await birdDataService.showInfo(sighting.title);
    if (!data) {
      throw new Error("Failed to fetch data.")
    }

    setInfo(data.entities);
  }

  useEffect(() => {
    const fetchSighting = async () => {
      const sightingData = await sightingService.show(sightingId);
      setSighting(sightingData);
      fetchFactsData(sightingData);
      fetchInfoData(sightingData);
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
          <h1>{sighting.title.toUpperCase()}</h1>
          <div className={styles.details}>
          <div className={styles.info}>
          <p id={styles.sciName}>{info[0] ? <i>{info[0].sciName}</i> : 'Loading...'}</p>
          <small><b>Size:</b> {info[0] ? `${info[0].lengthMin}-${info[0].lengthMax} cm` : 'Loading...'}</small>
          <small><b>Found in:</b> {info[0]?.region.map((location, index) => (
              <li key={index}>{location}</li>
            ))} 
          </small>
          <small><b>Conservation status:</b> {info[0] ? info[0].status : 'Loading...'}</small>
          { info[0]?.images?.[0] && (<img src={info[0].images[0]} alt="Bird image" height="200" width="200" /> )}
          </div>
          <div className={styles.userInput}>
            <p>
              {`${sighting.author.username} posted on
              ${new Date(sighting.createdAt).toLocaleDateString()}`}
            </p>
            <p>{sighting.text}</p>
            <h5 className={styles[`category-${sighting.category}`]}>{sighting.category}</h5>
            {sighting.author._id === user._id && (
              <div className={styles.button}>
                <Link to={`/sightings/${sightingId}/edit`} className={styles.editOrDelete}>Edit</Link>
                <button onClick={() => props.handleDeleteSighting(sightingId)} className={styles.editOrDelete}>Delete</button>
              </div>
            )}
          </div>
          <div className={styles.facts}>
        {facts && facts.length > 0 ? (
          <>
            <h2>Facts about the {sighting.title}</h2>
            <ul>
              {facts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </>
        ) : <p>Unavailable</p>}
        </div>
        </div>
                </header>
      </section>
      <section className={styles.comments}>
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
