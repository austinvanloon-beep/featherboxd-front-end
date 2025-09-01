import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import * as sightingService from '../../services/sightingService';
import './Dashboard.css';

const Dashboard = () => {
const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [sightings, setSightings] = useState([]);

  const handleLike = (sightingId) => {
    alert(`Like clicked for sighting ${sightingId}`);
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

  // fetch sightings
  const fetchSightings = async () => {
    try {
      const fetchedSightings = await sightingService.index();
      setSightings(fetchedSightings);
    } catch (err) {
      console.log(err);
    }
  };

  
  // delete button
  const handleDelete = async (sightingId) => {
    if (!window.confirm('Are you sure you want to delete this sighting?')) return;
    try {
      await sightingService.deleteSighting(sightingId);
      setSightings((prev) => prev.filter((s) => s._id !== sightingId));
    } catch (err) {
      console.error(err);
    }
  };

  // load sightings on mount
  useEffect(() => {
    if (user) fetchSightings();
  }, [user]);

return (
  <main className="dashboard-container">
    <div className="dashboard-header">
      <h1 className="dashboard-title">Welcome, {user.username}.</h1>
    </div>


  // main dashboard grid
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
                {/* edit button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/sightings/${sighting._id}/edit`);
                  }}
                >
                  Edit
                </button>

                {/* like button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(sighting._id);
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleLike(sighting._id);
                  }}
                >
                  {sighting.likes && sighting.likes.includes(user._id) ? '♥' : '♡'}{' '}
                  {sighting.likes ? sighting.likes.length : 0}
                </button>

                {/* delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(sighting._id);
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