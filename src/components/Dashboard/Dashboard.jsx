import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import * as sightingService from '../../services/sightingService';
import './Dashboard.css';

const Dashboard = ({ handleDeleteSighting }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [sightings, setSightings] = useState([]);

  const handleLike = (sightingId) => {
    alert(`Like clicked for sighting ${sightingId}`);
  };

  const handleDelete = async (sightingId) => {
  if (!window.confirm('Are you sure you want to delete this sighting?')) return;
  try {
    await sightingService.deleteSighting(sightingId);
    setSightings(sightings.filter(s => s._id !== sightingId));
  } catch (err) {
    console.error(err);
  }
};

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

return (
  <main className="dashboard-container">
    <div className="dashboard-header">
      <h1 className="dashboard-title">Welcome, {user.username}.</h1>
    </div>


    <div className="bird-title-wrapper">
      <h2 className="bird-title">Here are your sightings:</h2>
    </div>


    <div className="sightings-grid">
        {!sightings.reduce((userSightings, sighting) => {return sighting.author.username === user.username ? userSightings + 1 : userSightings}, 0) ? (
          <p>You have no sightings.</p>
          ) : (
            sightings.map((sighting) => (
            sighting.author.username === user.username ? (
            <div
              key={sighting._id}
              className="sighting-card"
              onClick={() => navigate(`/sightings/${sighting._id}`)}
            >
              <p><b>{sighting.title.toUpperCase()}</b></p>
              <img src={sighting.image ? sighting.image : "https://i.imgur.com/YsLYeEI.jpeg"} alt={sighting.title} />

              <div className="sighting-actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/sightings/${sighting._id}/edit`);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(sighting._id);
                  }}
                >
                  {sighting.likes && sighting.likes.includes(user._id) ? '♥' : '♡'}
                </button>
              <button
                onClick={async () => {
                  const confirmed = window.confirm('Are you sure you want to delete this sighting?');
                  if (!confirmed) return;

                  try {
                    await sightingService.deleteSighting(sighting._id);
                    navigate('/sightings');
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                Delete
              </button>

              </div>
            </div>
          ) : '' ))
        )
      }
    </div>
  </main>
);
}
export default Dashboard;