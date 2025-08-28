import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

import * as sightingService from '../../services/sightingService';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [sightings, setSightings] = useState([]);

  // tracks sighting for details view
  const [selectedSighting, setSelectedSighting] = useState(null);

  const handleComment = (sightingId) => {
    alert(`Comment clicked for sighting ${sightingId}`)
  };

  const handleTag = (sightingId) => {
    alert(`Tag clicked for sighting ${sightingId}`)
  };

  const handleLike = (sightingId) => {
    alert(`Like clicked for sighting ${sightingId}`)
  };

  const handleRating = (sightingId, rating) => {
    alert(`Rated ${rating} stars for sighting ${sightingId}`);
  };

  const handleImage = (sightingId) => {
    alert(`Insert URL clicked for sighting ${sightingId}`)
  }

  // fetch sightings
  useEffect(() => {
    const fetchSightings = async () => {
      try {
        const fetchedSightings = await sightingService.index();
        setSightings(fetchedSightings);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) fetchSightings();
  }, [user]);

  // show details page if sighting is selected
  if (selectedSighting) {
    return (
      <main className="dashboard-container">
{/* show back button once inside details */}
 <button onClick={() => setSelectedSighting(null)}>Back to Dashboard</button>
        <div className="sighting-details">
          <h2>{selectedSighting.title}</h2>
          <img
            src={selectedSighting.imageUrl}
            alt={selectedSighting.title}
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <p>{selectedSighting.text}</p>

          <div className="sighting-actions">
            <button onClick={() => handleComment(selectedSighting._id)}>Comment</button>
            <button onClick={() => handleTag(selectedSighting._id)}>Tag</button>
            <button onClick={() => handleLike(selectedSighting._id)}>Like</button>
            <button onClick={() => handleImage(selectedSighting._id)}>Insert URL</button>
          </div>

          <div className="sighting-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(selectedSighting._id, star)}
                style={{ cursor: 'pointer', fontSize: '20px', marginRight: '4px' }}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // MAIN dashboard grid
  return (
    <main className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {user.username}</h1>
      </div>

      <div className="bird-title-wrapper">
        <h2 className="bird-title">Here are your sightings:</h2>
      </div>

      <div className="sightings-grid">
        {sightings.length > 0 ? (
          sightings.map((sighting) => (
            <div
              key={sighting._id}
              className="sighting-card"
              onClick={() => setSelectedSighting(sighting)} // open details!!!
            >
              <img src={sighting.imageUrl} alt={sighting.title} />

              {/* ratings */}
              <div className="sighting-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  // stopPropagation = clicking stars doesnt open details
                  <span
                    key={star}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRating(sighting._id, star);
                    }}
                    style={{ cursor: 'pointer', fontSize: '20px', marginRight: '4px' }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* actions */}
              <div className="sighting-actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleComment(sighting._id);
                  }}
                >
                  Comment
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTag(sighting._id);
                  }}
                >
                  Tag
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(sighting._id);
                  }}
                >
                  Like
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImage(sighting._id);
                  }}
                >
                  Insert URL
                </button>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="sighting-box">Sighting 1</div>
            <div className="sighting-box">Sighting 2</div>
            <div className="sighting-box">Sighting 3</div>
          </>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
