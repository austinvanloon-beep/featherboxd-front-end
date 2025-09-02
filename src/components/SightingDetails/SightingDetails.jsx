import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { FaEdit, FaTrash } from "react-icons/fa";

import CommentForm from "../CommentForm/CommentForm";

import * as sightingService from "../../services/sightingService";
import * as birdDataService from "../../services/birdDataService";
import * as mapService from "../../services/mapService";

import { UserContext } from "../../contexts/UserContext";

import styles from "./SightingDetails.module.css";

const MAPS_API_KEY = import.meta.env.VITE_MAPS_API_KEY;

const SightingDetails = (props) => {
  const [sighting, setSighting] = useState(null);
  const { user } = useContext(UserContext);
  const { sightingId } = useParams();
  const [info, setInfo] = useState([]);
  const [facts, setFacts] = useState([]);
  const [coordinates, setCoordinates] = useState(null);

  const fetchFactsData = async (sighting) => {
    const data = await birdDataService.showFacts(
      `Generate 5 ${sighting.title} bird facts &facts=array of ${sighting.title} facts`
    );
    if (data?.facts) setFacts(data.facts);
  };

  const fetchInfoData = async (sighting) => {
    const data = await birdDataService.showInfo(sighting.title);
    if (data?.entities) setInfo(data.entities);
  };

  useEffect(() => {
    const fetchSighting = async () => {
      const sightingData = await sightingService.show(sightingId);
      setSighting(sightingData);
      fetchFactsData(sightingData);
      fetchInfoData(sightingData);
      setCoordinates(await mapService.convertLocation(sightingData.location));
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

  if (!sighting) return <main className={styles.loading}>Loading...</main>;

  const bird = info[0];

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{sighting.title.toUpperCase()}</h1>

      <div className={styles.topRow}>
        {/* Bird Info Left */}
        <div className={styles.birdInfoSection}>
          {bird && (
            <>
              <h2>Bird Info</h2>
              <p><i>{bird.sciName}</i></p>
              <p><b>Size:</b> {bird.lengthMin}-{bird.lengthMax} cm</p>
              <p><b>Regions:</b> {bird.region?.join(", ")}</p>
              <p><b>Status:</b> {bird.status}</p>

              {bird.images?.[0] && (
                <div className={styles.imageContainer}>
                  <img
                    src={bird.images[0]}
                    alt="Bird"
                    className={styles.birdImage}
                    loading="lazy"
                    // height and width handled by CSS for responsiveness
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Description Right */}
        <div className={styles.descriptionSection}>
          <h2>Description</h2>
          <p><strong>Posted by:</strong> {sighting.author.username}</p>
          <p><strong>Date:</strong> {new Date(sighting.createdAt).toLocaleDateString()}</p>

          <div className={styles.imageContainer}>
            <img
              src={sighting.image || "https://i.imgur.com/YsLYeEI.jpeg"}
              alt={sighting.title}
              className={styles.mainImage}
              loading="lazy"
            />
          </div>

          <p>{sighting.text}</p>
          <h5 className={styles[`category-${sighting.category}`]}>
            {sighting.category}
          </h5>

          {sighting.author._id === user._id && (
            <div className={styles.cardActions}>
              <Link to={`/sightings/${sightingId}/edit`} className={styles.cardIconButton} aria-label="Edit sighting">
                <FaEdit />
              </Link>
              <button
                onClick={() => {
                  if (window.confirm("Delete this sighting?")) {
                    props.handleDeleteSighting(sightingId);
                  }
                }}
                className={`${styles.cardIconButton} ${styles.deleteIcon}`}
                aria-label="Delete sighting"
              >
                <FaTrash />
              </button>
            </div>
          )}

          <button className={styles.likeButton} aria-label="Like button">
            {sighting.likes?.includes(user._id) ? "♥" : "♡"}
          </button>
        </div>
      </div>

      {/* Map Section */}
      <div className={styles.mapSection}>
        <h2>Map</h2>
        <p><b>Location:</b> {sighting.location}</p>
        {coordinates ? (
          <APIProvider apiKey={MAPS_API_KEY}>
            <Map
              center={coordinates}
              zoom={15}
              style={{ width: "100%", height: "300px" }}
              disableDefaultUI={true}
            />
          </APIProvider>
        ) : (
          <p>Loading map...</p>
        )}
      </div>

      {/* Comments Section */}
      <div className={styles.commentsSection}>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!sighting.comments.length && <p>No comments yet.</p>}
        {sighting.comments.map((comment) => (
          <article key={comment._id} className={styles.comment}>
            <header className={styles.commentHeader}>
              <p>
                {comment.author.username} on{" "}
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
              {comment.author._id === user._id && (
                <div className={styles.commentActions}>
                  <Link
                    to={`/sightings/${sightingId}/comments/${comment._id}/edit`}
                    className={styles.cardIconButton}
                    aria-label="Edit comment"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className={`${styles.cardIconButton} ${styles.deleteIcon}`}
                    aria-label="Delete comment"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </div>

      {/* Fun Facts Section */}
      {facts.length > 0 && (
        <div className={styles.factsSection}>
          <h2>Fun Facts</h2>
          <ul>
            {facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default SightingDetails;






