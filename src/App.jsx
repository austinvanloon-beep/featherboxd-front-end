import { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import HootList from './components/HootList/HootList';
import HootDetails from './components/HootDetails/HootDetails';
import HootForm from './components/HootForm/HootForm';
import CommentForm from './components/CommentForm/CommentForm';

import { UserContext } from './contexts/UserContext';

import * as hootService from './services/hootService';

const App = () => {
  const { user } = useContext(UserContext);

  const [hoots, setHoots] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();

      setHoots(hootsData);
    };

    if (user) fetchAllHoots();
  }, [user]);

  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData);
    setHoots([newHoot, ...hoots]);
    navigate('/hoots');
  }

  const handleDeleteHoot = async (hootId) => {
    const deletedHoot = await hootService.deleteHoot(hootId);
    setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot._id));
    navigate('/hoots');
  }

  const handleUpdateHoot = async (hootId, hootFormData) => {
    const updatedHoot = await hootService.update(hootId, hootFormData);
    setHoots(hoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));
    navigate(`/hoots/${hootId}`);
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />

        <Route 
          path='/hoots' 
          element={user ? <HootList hoots={hoots}/> : <SignInForm />} 
        />
        <Route 
          path='/hoots/:hootId'
          element={user ? <HootDetails handleDeleteHoot={handleDeleteHoot}/> : <SignInForm />} 
        />
        <Route 
          path='/hoots/new' 
          element={user ? <HootForm handleAddHoot={handleAddHoot} /> : <SignInForm />} 
        />
        <Route
          path='/hoots/:hootId/edit'
          element={user ? <HootForm handleUpdateHoot={handleUpdateHoot} /> : <SignInForm />} 
        />
        <Route
          path='/hoots/:hootId/comments/:commentId/edit'
          element={user ? <CommentForm /> : <SignInForm />} 
        />

        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;
