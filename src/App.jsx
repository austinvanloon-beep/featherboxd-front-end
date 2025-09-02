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
import AboutPage from "./components/AboutPage/AboutPage";


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
  };

  const handleDeleteSighting = async (sightingId) => {
    const deletedSighting = await sightingService.deleteSighting(sightingId);
    setSightings(sightings.filter((s) => s._id !== deletedSighting._id));
    navigate('/sightings');
  };

  const handleUpdateSighting = async (sightingId, sightingFormData) => {
    const updatedSighting = await sightingService.update(sightingId, sightingFormData);
    setSightings(sightings.map((s) => (sightingId === s._id ? updatedSighting : s)));
    navigate(`/sightings/${sightingId}`);
  };

const handleLike = async (sightingId) => {
  if (!user) return;
  setSightings((prev) =>
    prev.map((s) => {
      if (s._id === sightingId) {
        const userHasLiked = s.likes?.includes(user._id);
        let newLikes;
        if (userHasLiked) {
          newLikes = s.likes.filter((id) => id !== user._id);
        } else {
          newLikes = [...(s.likes || []), user._id];
        }
        return { ...s, likes: newLikes };
      }
      return s;
    })
  );

  try {
    await sightingService.likeSighting(sightingId, user._id);
  } catch (err) {
    console.error("Failed to update like on backend:", err);
  }
};

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard handleDeleteSighting={handleDeleteSighting} /> : <Landing />} />
          <Route
            path='/sightings'
            element={
              user ? (
                <SightingList
                  sightings={sightings}
                  currentUserId={user._id}
                  onLike={handleLike}
                  onEdit={(id) => navigate(`/sightings/${id}/edit`)}
                />
              ) : (
                <SignInForm />
              )
            }
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
        <Route 
          path='/dashboard'
          element={user ? <Dashboard sightings={sightings} handleLike={handleLike} handleDeleteSighting={handleDeleteSighting} /> : <SignInForm />} 
        />
        <Route path='/location-search' element={<BirdSearch />} />
        <Route path='/species-search' element={<SpeciesSearch />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
};

export default App;