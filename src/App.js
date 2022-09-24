import "./App.css";
import AppBar from "./components/Appbar";
import Learner from "./components/Learner";
import { Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Settings from "./pages/Settings";
import Home from "./pages/Home";
import LearnerCreation from "./pages/LearnerCreation";
import Appbar from "./components/Appbar";
import TeachingCoursesList from "./pages/TeachingCoursesList";
import TeachingCourse from "./pages/TeachingCourse";
import TeachingCourseNew from "./pages/TeachingCourseNew";
import TeachingForumList from "./components/TeachingForumList";
import TeachingDiscussion from "./components/TeachingDiscussion";
import TeachingForum from "./components/TeachingForum";
import TeachingFileList from "./components/TeachingFileList";
import SettingsDrawer from "./components/SettingsDrawer";
import ViewAllEducators from "./pages/ViewAllEducators";
import ViewInstructor from "./pages/ViewInstructor";
import TeachingChildFileCover from "./components/TeachingChildFileCover";
import TeachingCourseSettings from "./components/TeachingCourseSettings";

import { AuthProvider } from "./context/AuthProvider";
import { RequireAuth } from "./components/RequireAuth";
import Login from "./components/Login";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            {/* <Route path = "/" element={<Home />} /> */}
            <Route path="/" element={<Login />} />

            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Appbar />
                  <Home />
                </RequireAuth>
              }
            />

            <Route
              path="/account"
              element={
                <RequireAuth>
                  <Appbar />
                  <AccountPage />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCoursesList"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingCoursesList />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCourse/:courseId"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingCourse />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCourse/new"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingCourseNew />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCourse/:courseId/courseSettings"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingCourseSettings />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCourse/:moduleCode/files"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingFileList />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCourse/:moduleCode/files/:folderId"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingChildFileCover />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCourse/:courseId/forum"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingForumList />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCourse/:courseId/forum/:forumId"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingForum />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCourse/:courseId/forum/:forumId/:discussionId"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingDiscussion />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCourse/:courseId/files"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingFileList />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCourse/:courseId/files/:folderId"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingChildFileCover />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCourse/:moduleCode/files"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingFileList />
                </RequireAuth>
              }
            />

            <Route
              path="/adminDrawer"
              element={
                <RequireAuth>
                  <Appbar />
                  <SettingsDrawer />
                </RequireAuth>
              }
            />

            <Route
              path="/settings"
              element={
                <RequireAuth>
                  <Appbar />
                  <Settings />
                </RequireAuth>
              }
            />

            <Route path="/learnerCreation" element={<LearnerCreation />} />
            <Route path="/viewAllEducators" element={<ViewAllEducators />} />
            <Route path="/viewInstructor" element={<ViewInstructor />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
