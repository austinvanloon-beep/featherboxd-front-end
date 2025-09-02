import { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { FaHeart, FaRegHeart, FaEdit } from 'react-icons/fa';
import { UserContext } from '../../contexts/UserContext';
import * as sightingService from '../../services/sightingService';
import './Dashboard.css';

const ITEMS_PER_PAGE = 3;

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [allSightings, setAllSightings] = useState([]);
  const [visibleSightings, setVisibleSightings] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchSightings = async () => {
      try {
        const fetchedSightings = await sightingService.index();
        const userSightings = fetchedSightings.filter(
          (sighting) => sighting.author.username === user.username
        );
        setAllSightings(userSightings);
        setVisibleSightings(userSightings.slice(0, ITEMS_PER_PAGE));
        setHasMore(userSightings.length > ITEMS_PER_PAGE);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSightings();
  }, [user]);

  const loadMore = () => {
    const nextItems = allSightings.slice(
      visibleSightings.length,
      visibleSightings.length + ITEMS_PER_PAGE
    );
    setVisibleSightings((prev) => [...prev, ...nextItems]);
    if (visibleSightings.length + nextItems.length >= allSightings.length) {
      setHasMore(false);
    }
  };

  const observer = useRef();
  const lastSightingRef = useCallback(
    (node) => {
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loadMore]
  );

  const handleLike = (sightingId) => {
    setVisibleSightings((prevSightings) =>
      prevSightings.map((sighting) => {
        if (sighting._id === sightingId) {
          const userHasLiked = sighting.likes?.includes(user._id);
          let newLikes;
          if (userHasLiked) {
            newLikes = sighting.likes.filter((id) => id !== user._id);
          } else {
            newLikes = [...(sighting.likes || []), user._id];
          }
          return { ...sighting, likes: newLikes };
        }
        return sighting;
      })
    );
  };

  if (!user) {
    return <p style={{ textAlign: 'center' }}>Please log in to view your sightings.</p>;
  }

  return (
    <main className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {user.username}.</h1>
      </header>

      <section className="bird-title-wrapper">
        <h2 className="bird-title">Here are your sightings:</h2>
      </section>

      {visibleSightings.length === 0 ? (
        <p className="no-sightings">You have no sightings.</p>
      ) : (
        <section className="sightings-grid">
          {visibleSightings.map((sighting, index) => {
            const userHasLiked = sighting.likes?.includes(user._id);
            const likesCount = sighting.likes?.length || 0;

            const isLast = index === visibleSightings.length - 1;

            return (
              <article
                key={sighting._id}
                className="sighting-card"
                ref={isLast ? lastSightingRef : null}
                onClick={() => navigate(`/sightings/${sighting._id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/sightings/${sighting._id}`);
                  }
                }}
              >
                <img
                  src={sighting.image || 'https://i.imgur.com/YsLYeEI.jpeg'}
                  alt={sighting.title}
                  className="sighting-image"
                />

                <div className="sighting-actions">
                  <div className="like-wrapper">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(sighting._id);
                      }}
                      aria-label={userHasLiked ? 'Unlike' : 'Like'}
                      type="button"
                      className="like-button"
                    >
                      {userHasLiked ? <FaHeart /> : <FaRegHeart />}
                    </button>
                    <span className="like-count">{likesCount}</span>
                  </div>

                  <button
                    className="card-edit-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/sightings/${sighting._id}/edit`);
                    }}
                    aria-label="Edit sighting"
                    type="button"
                  >
                    <FaEdit />
                  </button>
                </div>

                <p>{sighting.title.toUpperCase()}</p>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
};

export default Dashboard;

