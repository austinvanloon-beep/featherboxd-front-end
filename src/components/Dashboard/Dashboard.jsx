import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';
import * as sightingService from '../../services/sightingService';


const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [ users, setUsers ] = useState([]);
  const [sightings, setSightings] = useState([]);

// fetch user(s)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);

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
    <main>
      <h1>Welcome, {user.username}!</h1>
      <p>
        This is the dashboard page where you can see a list of all the users.
      </p>
      {/* users list */}
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
      {/* bird title */}
      <section className="my-6 text-center">
        <h2 className="text-3xl font-bold">Blue jay</h2>
      </section>

      {/* sighting grid */}
      <section className="grid grid-cols-3 gap-6 px-6">
        {sightings.map(sighting => (
         <div
            key={sighting._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={sighting.imageUrl}
              alt="bird sighting"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex justify-around text-sm text-gray-600">
              <button className="hover:text-blue-500">💬 Comment</button>
              <button className="hover:text-green-500">🏷️ Tag</button>
              <button className="hover:text-yellow-500">⭐ Rate</button>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
};

export default Dashboard;
