import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';


import * as userService from '../../services/userService';
import * as sightingService from '../../services/sightingService';
import './Dashboard.css';


const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [sightings, setSightings] = useState([]);


  // fetch users (future community tab)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) fetchUsers()
  }, [user])


  // fetch sightings
  useEffect(() => {
    const fetchSightings = async () => {
      try {
        const fetchedSightings = await sightingService.index()
        setSightings(fetchedSightings)
      } catch (err) {
        console.log(err)
      }
    };
    if (user) fetchSightings()
  }, [user])


  return (
    <main className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {user.username}</h1>
      <div className="dashboard-header">
      <h2 className="dashboard-title">Blue Jay</h2>
      </div>
      
      <div className="sightings-grid">
        {sightings.length > 0 ? (
          sightings.map((sighting) => (
            <div key={sighting._id} className="sighting-card">
              <img src={sighting.imageUrl} alt={sighting.title} />
              <h3>{sighting.title}</h3>
              {/* comment/rating buttons here later */}
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

      {/* move below to community tab later */}
      {/* 
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul> 
      */}
    </main>
  );
};


export default Dashboard

