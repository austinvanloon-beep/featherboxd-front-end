import { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SightingList from './components/SightingList/SightingList';
import SightingDetails from './components/SightingDetails/SightingDetails';
import SightingForm from './components/SightingForm/SightingForm';
import CommentForm from './components/CommentForm/CommentForm';
import BirdSearch from './components/BirdSearch/BirdSearch';
import SpeciesSearch from './components/SpeciesSearch/SpeciesSearch';

import { UserContext } from './contexts/UserContext';

import * as sightingService from './services/sightingService';

const App = () => {
  const { user } = useContext(UserContext);

  const [sightings, setSightings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllSightings = async () => {
      const sightingsData = await sightingService.index();
      setSightings(sightingsData);
    };

    if (user) fetchAllSightings();
  }, [user]);

  const handleAddSighting = async (sightingFormData) => {
    const newSighting = await sightingService.create(sightingFormData);
    setSightings([newSighting, ...sightings]);
    navigate('/sightings');
  }

  const handleDeleteSighting = async (sightingId) => {
    const deletedSighting = await sightingService.deleteSighting(sightingId);
    setSightings(sightings.filter((sighting) => sighting._id !== deletedSighting._id));
    navigate('/sightings');
  }

  const handleUpdateSighting = async (sightingId, sightingFormData) => {
    const updatedSighting = await sightingService.update(sightingId, sightingFormData);
    setSightings(sightings.map((sighting) => (sightingId === sighting._id ? updatedSighting : sighting)));
    navigate(`/sightings/${sightingId}`);
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard handleDeleteSighting={handleDeleteSighting} /> : <Landing />} />
        <Route
          path='/sightings'
          element={user ? <SightingList sightings={sightings}/> : <SignInForm />}
        />
        <Route
          path='/sightings/:sightingId'
          element={user ? <SightingDetails handleDeleteSighting={handleDeleteSighting}/> : <SignInForm />}
        />
        <Route
          path='/sightings/new'
          element={user ? <SightingForm handleAddSighting={handleAddSighting} /> : <SignInForm />}
        />
        <Route
          path='/sightings/:sightingId/edit'
          element={user ? <SightingForm handleUpdateSighting={handleUpdateSighting} /> : <SignInForm />}
        />
        <Route
          path='/sightings/:sightingId/comments/:commentId/edit'
          element={user ? <CommentForm /> : <SignInForm />}
        />

        <Route path='/location-search' element={<BirdSearch />} />
        <Route path='/species-search' element={<SpeciesSearch />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;
