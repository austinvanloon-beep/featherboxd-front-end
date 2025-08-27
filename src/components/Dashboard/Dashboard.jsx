import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

import * as sightingService from '../../services/sightingService';
import './Dashboard.css';


const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [sightings, setSightings] = useState([]);


  const handleComment = (sightingId) => {
    alert(`Comment clicked for sighting ${sightingId}`)
  };

  const handleTag = (sightingId) => {
    alert(`Tag clicked for sighting ${sightingId}`)
  };

  const handleLike = (sightingId) => {
    alert(`Like clicked for sighting ${sightingId}`)
  };

//   const handleRating = (sightingId, rating) => {
//   alert(`Rated ${rating} stars for sighting ${sightingId}`);
// };



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

  return (
  <main className="dashboard-container">
    <div className="dashboard-header">
      <h1 className="dashboard-title">Welcome, {user.username}</h1>
    </div>

    <div className="bird-title-wrapper">
      <h2 className="bird-title">Blue jay</h2>
    </div>

    <div className="sightings-grid">
      {sightings.length > 0 ? (
        sightings.map((sighting) => (
          <div key={sighting._id} className="sighting-card">
<img src={sighting.imageUrl} alt={sighting.title} />
<p style={{color: 'red'}}>TEST MESSAGE UNDER SIGHTING</p>


{/* ratings */}
<div className="sighting-rating">
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      onClick={() => handleRating(sighting._id, star)}
      style={{ cursor: 'pointer', fontSize: '20px', marginRight: '4px' }}
    >
      ★
    </span>
  ))}
</div>

{/* actions */}
<div className="sighting-actions">
  <button onClick={() => handleComment(sighting._id)}>Comment</button>
  <button onClick={() => handleTag(sighting._id)}>Tag</button>
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
