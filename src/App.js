import './App.css';
import AppBar from './components/Appbar';
import Learner from './components/Learner'
import { Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Settings from './pages/Settings';
import Home from './pages/Home';
import LearnerCreation from './pages/LearnerCreation';
import Appbar from './components/Appbar';
import TeachingCourses from './pages/TeachingCourses';

function App() {
  return (
    <div className="App">
      <Router>
        <Appbar></Appbar>
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/myTeachingModules" element={<TeachingCourses />} />
          <Route path = "/settings" element={<Settings/>} />
          <Route path = "/learnerCreation" element={<LearnerCreation/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
