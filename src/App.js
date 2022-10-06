import "./App.css";
import AppBar from "./components/Appbar";
import Learner from "./components/Learner";
import { Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Settings from "./pages/Settings";
import Home from "./pages/Home";
import LearnerCreation from "./pages/LearnerCreation";
import LearnerCoursesList from "./pages/LearnerCoursesList";
import Appbar from "./components/Appbar";
import TeachingCoursesList from "./pages/TeachingCoursesList";
import TeachingCourse from "./pages/TeachingCourse";
import TeachingCourseNew from "./pages/TeachingCourseNew";
import TeachingAssessmentList from "./components/TeachingAssessmentList";
import FileSubmission from "./components/FileSubmission";
import TeachingForumList from "./components/TeachingForumList";
import TeachingDiscussion from "./components/TeachingDiscussion";
import TeachingForum from "./components/TeachingForum";
import TeachingFileList from "./components/TeachingFileList";
import SettingsDrawer from "./components/SettingsDrawer";
import ViewAllEducators from "./pages/ViewAllEducators";
import ViewInstructor from "./pages/ViewInstructor";
import TeachingChildFileCover from "./components/TeachingChildFileCover";
import TeachingCourseSettings from "./components/TeachingCourseSettings";
import TeachingCourseCalender from "./components/TeachingCourseCalender";

import { AuthProvider } from "./context/AuthProvider";
import { RequireAuth } from "./components/RequireAuth";
import Login from "./components/Login";
import AccountPage from "./pages/AccountPage";
import Signup from "./pages/Signup";
import RegisterPage from "./pages/RegisterPage";
import RegisterLearnerPage from "./pages/RegisterLearnerPage";
import RegisterOrganisationAdminPage from "./pages/RegisterOrganisationAdminPage";
import CourseExplorerPage from "./pages/CourseExplorerPage";
import CourseEnrollmentPage from "./pages/CourseEnrollmentPage";
import LearnerCourseDetails from "./pages/LearnerCourseDetails";
import TeachingClassRuns from "./components/TeachingClassRuns";
import TeachingClassEvents from "./components/TeachingClassEvents";

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
              path="/myLearnerCoursesList"
              element={
                <RequireAuth>
                  <Appbar />
                  <LearnerCoursesList/>
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
              path="/myTeachingCourse/:courseId/courseCalender"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingCourseCalender />
                </RequireAuth>
              }
            />
            <Route
              path="/myTeachingCourse/:courseId/classRuns"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingClassRuns />
                </RequireAuth>
              }
            />
            <Route
              path="/myTeachingCourse/:courseId/classRuns/:classRunId"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingClassEvents/>
                </RequireAuth>
              }
            />
            <Route
              path="/myTeachingCourse/:courseId/assessments"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingAssessmentList />
                </RequireAuth>
              }
            />
            <Route
              path="/myTeachingCourse/:courseId/assessments/:assessmentId"
              element={
                <RequireAuth>
                  <Appbar />
                  <FileSubmission />
                </RequireAuth>
              }
            />
            <Route
              path="/myTeachingCourse/:courseId/courseEnrollment"
              element={
                <RequireAuth>
                  <Appbar />
                  <CourseEnrollmentPage />
                </RequireAuth>
              }
            />
            <Route
              path="/learnerCourseDetails/:courseId/"
              element={
                <RequireAuth>
                  <Appbar />
                  <LearnerCourseDetails />
                </RequireAuth>
              }
            />
            <Route
              path="/courseExplorer/"
              element={
                <RequireAuth>
                  <Appbar />
                  <CourseExplorerPage/>
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
            <Route
              path="/learnerCreation"
              element={
                <RequireAuth>
                  <Appbar />
                  <LearnerCreation />
                </RequireAuth>
              }
            />
            <Route
              path="/viewAllEducators"
              element={
                <RequireAuth>
                  <Appbar />
                  <ViewAllEducators />
                </RequireAuth>
              }
            />{" "}
            <Route
              path="/viewInstructor/:instructorUsername"
              element={
                <RequireAuth>
                  <Appbar />
                  <ViewInstructor />
                </RequireAuth>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register/learner" element={<RegisterLearnerPage />} />
            <Route
              path="/register/educator"
              element={<RegisterOrganisationAdminPage />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
