import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import * as sightingService from '../../services/sightingService';
import './Dashboard.css';


const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [sightings, setSightings] = useState([]);
  const [selectedSighting, setSelectedSighting] = useState(null);
  const [favorites, setFavorites] = useState([]); 

  const handleComment = (sightingId) => {
    alert(`Comment clicked for sighting ${sightingId}`);
  };

  const handleTag = (sightingId) => {
    alert(`Tag clicked for sighting ${sightingId}`);
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



  // dashboard grid
  return (
    <main className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {user.username}.</h1>
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
              onClick={() => navigate(`/sightings/${sighting._id}`)}
            >
              <img src={sighting.imageUrl} alt={sighting.title} />

              <div className="sighting-actions">
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(sighting._id);
                  }}
                >
                  {favorites.includes(sighting._id) ? '♥' : '♡'}
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
