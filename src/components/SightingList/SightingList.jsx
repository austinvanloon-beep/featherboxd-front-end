import { Link } from "react-router";  
import { FaHeart, FaRegHeart, FaEdit } from "react-icons/fa";
import styles from "./SightingList.module.css";

const SightingList = ({ sightings, currentUserId, onLike, onEdit }) => {
  return (
    <main className={styles["sightings-grid"]}>
      {sightings.map((sighting) => {
        const userHasLiked = Array.isArray(sighting.likes) && sighting.likes.includes(currentUserId);
        const likesCount = Array.isArray(sighting.likes) ? sighting.likes.length : 0;

        return (
          <article
            key={sighting._id}
            className={styles["sighting-card"]}
            tabIndex={0}
            role="button"
            onClick={() => window.location.href = `/sightings/${sighting._id}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                window.location.href = `/sightings/${sighting._id}`;
              }
            }}
          >
            {/* Top actions: Like + Edit */}
            <div className={styles["sighting-actions"]}>
              <div className={styles["like-wrapper"]}>
                <button
                  aria-label={userHasLiked ? "Unlike" : "Like"}
                  className={styles["like-button"]}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (onLike) onLike(sighting._id);
                  }}
                >
                  {userHasLiked ? <FaHeart color="#059669" /> : <FaRegHeart />}
                </button>
                <span className={styles["like-count"]}>{likesCount}</span>
              </div>

              <button
                className={styles["card-edit-button"]}
                aria-label="Edit sighting"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (onEdit) onEdit(sighting._id);
                }}
              >
                <FaEdit />
              </button>
            </div>

            {/* Image */}
            <img
              src={sighting.image || "https://i.imgur.com/YsLYeEI.jpeg"}
              alt={sighting.title}
              className={styles["sighting-image"]}
            />

            {/* Title overlay */}
            <p>{sighting.title.toUpperCase()}</p>
          </article>
        );
      })}
    </main>
  );
};

export default SightingList;





