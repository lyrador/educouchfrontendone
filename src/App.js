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
import TeachingForumCreate from './components/TeachingForumCreate';
import TeachingDiscussionCreate from './components/TeachingDiscussionCreate';
import TeachingCommentsCreate from './components/TeachingCommentsCreate';

function App() {
  return (
    <div className="App">
      <Router>
        <Appbar></Appbar>
        <Routes>
          <Route path = "/" element={<Home />} />

          <Route path = "/myTeachingCoursesList" element={<TeachingCoursesList />} />
          <Route path = "/myTeachingCourse/:courseId" element={<TeachingCourse />}></Route>
          <Route path = "/myTeachingCourse/new" element={<TeachingCourseNew />} />

          <Route path = "/myTeachingCourse/:courseId/courseSettings" element={<TeachingCourseSettings />}  />

          <Route path = "/myTeachingCourse/:courseId/newForum" element={<TeachingForumCreate/>} />
          <Route path = "/myTeachingCourse/:courseId/forum" element={<TeachingForumList />} />
          <Route path = "/myTeachingCourse/:courseId/forum/:forumId" element={<TeachingForum />} />

          <Route path = "/myTeachingCourse/:courseId/forum/:forumId/newDiscussion" element={<TeachingDiscussionCreate/>} />
          <Route path = "/myTeachingCourse/:courseId/forum/:forumId/:discussionId" element={<TeachingDiscussion />} />

          <Route path = "/myTeachingCourse/:courseId/forum/:forumId/:discussionId/newComment" element={<TeachingCommentsCreate/>} />


          <Route path = "/myTeachingCourse/:courseId/files" element={<TeachingFileList />} />
          <Route path = "/myTeachingCourse/:courseId/files/:folderId" element={<TeachingChildFileCover/>} />

          <Route path = "/settings" element={<Settings/>} />
          <Route path = "/learnerCreation" element={<LearnerCreation/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
