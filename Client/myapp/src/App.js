import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateTrip from './pages/CreateTrip';
import MyTrips from './pages/MyTrips';
import ItineraryBuilder from './pages/ItineraryBuilder';
import UserProfile from './pages/UserProfile';
import SearchPage from './pages/SearchPage';
import ItineraryView from './pages/ItineraryView';
import Community from './pages/Community';
import CalendarView from './pages/CalendarView';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/itinerary/:tripId" element={<ItineraryBuilder />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/itinerary/:tripId/view" element={<ItineraryView />} />
        <Route path="/community" element={<Community />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
