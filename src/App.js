import './App.css';
import AppBar from './components/Appbar';
import Learner from './components/Learner'
import { Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Settings from './pages/Settings';
import Home from './pages/Home';
import LearnerCreation from './pages/LearnerCreation';
import Appbar from './components/Appbar';
import TeachingCoursesList from './pages/TeachingCoursesList';
import TeachingCourse from './pages/TeachingCourse';
import TeachingCourseNew from './pages/TeachingCourseNew';
import TeachingForumList from './components/TeachingForumList';
import TeachingDiscussion from './components/TeachingDiscussion';
import TeachingForum from './components/TeachingForum';
import TeachingFileList from './components/TeachingFileList';
import TeachingChildFileCover from './components/TeachingChildFileCover';

import TeachingCourseSettings from './components/TeachingCourseSettings';

function App() {
  return (
    <div className="App">
      <Router>
        <Appbar></Appbar>
        <Routes>
          <Route path = "/" element={<Home />} />

          <Route path = "/myTeachingCoursesList" element={<TeachingCoursesList />} />
          <Route path = "/myTeachingCourse/:moduleCode" element={<TeachingCourse />}></Route>
          <Route path = "/myTeachingCourse/new" element={<TeachingCourseNew />} />

          <Route path = "/myTeachingCourse/:moduleCode/courseSettings" element={<TeachingCourseSettings />}  />
          <Route path = "/myTeachingCourse/:moduleCode/forum" element={<TeachingForumList />} />
          <Route path = "/myTeachingCourse/:moduleCode/forum/:forumId" element={<TeachingForum />} />
          <Route path = "/myTeachingCourse/:moduleCode/forum/:forumId/:discussionId" element={<TeachingDiscussion />} />

          <Route path = "/myTeachingCourse/:moduleCode/files" element={<TeachingFileList />} />
          <Route path = "/myTeachingCourse/:moduleCode/files/:folderId" element={<TeachingChildFileCover/>} />

          <Route path = "/settings" element={<Settings/>} />
          <Route path = "/learnerCreation" element={<LearnerCreation/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
