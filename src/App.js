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
import TeachingAnnouncementList from "./components/TeachingAnnouncementList";
import LearnerAnnouncementList from "./components/LearnerAnnouncementList";
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
import LearnerCourseCalender from "./pages/LearnerCourseCalendar";

import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/AuthProvider";
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
import SuccessRefundRequestPage from "./pages/SuccessRefundRequestPage";
import TeachingClassRuns from "./components/TeachingClassRuns";
import TeachingClassEvents from "./components/TeachingClassEvents";
import CreateQuizForm from "./pages/CreateQuizForm";
import CreateAssessment from "./pages/CreateAssessment";
import LearnerCalendar from "./components/LearnerCalendar";
import OrganisationPointsConfig from "./components/OrganisationPointsConfig";
import EditQuizPage from "./pages/EditQuizPage";
import ClassRunListPage from "./pages/ClassRunListPage";
import CourseApprovalPage from "./pages/CourseApprovalPage";
import LearnerCourseFolder from "./pages/LearnerCourseFolder";
import LearnerChildFileCover from "./components/LearnerChildFileCover";
import WhiteboardHomepage from "./pages/WhiteboardHomepage";
import Room from "./pages/Room";
import TeachingInteractiveBooksList from "./components/TeachingInteractiveBooksList";
import TeachingInteractiveBook from "./components/TeachingInteractiveBook";
import QuizAttempt from "./components/QuizAttemptComponents/QuizAttempt";
import LearnerViewAssessments from "./pages/LearnerViewAssessments";
import TeachingMarkerPage from "./pages/TeachingMarkerPage";
import TeachingGradebook from "./pages/TeachingGradebook"
import TeachingGradebookGrading from "./pages/TeachingGradebookGrading"
import LearnerGradeBook from "./pages/LearnerGradeBook";
import LearnerInteractiveBooksList from "./components/LearnerInteractiveBookList";
import LearnerInteractiveBook from "./components/LearnerInteractiveBook";
import FileSubmissionAttempt from "./components/FileSubmissionAttemptComponents/FileSubmissionAttempt";
import CreateWhiteboardHomepage from "./pages/CreateWhiteboardHomepage";
import ViewAllRoomPage from "./pages/ViewAllRoomPage";
import WebPet from "web-pet";






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
                  <LearnerCoursesList />
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
              path="/learnerCourses/:courseId/courseCalender"
              element={
                <RequireAuth>
                  <Appbar />
                  <LearnerCourseCalender />
                </RequireAuth>
              }
            />
            <Route
              path="/learnerCourseDetails/:courseId/courseCalender"
              element={
                <RequireAuth>
                  <Appbar />
                  <LearnerCourseCalender />
                </RequireAuth>
              }
            />
            <Route
              path="/learnerCourseDetails/:courseId/assessments"
              element={
                <RequireAuth>
                  <Appbar />
                  <LearnerViewAssessments />
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
                  <TeachingClassEvents />
                </RequireAuth>
              }
            />
            <Route
              path="/myTeachingCourse/:courseId/announcements"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingAnnouncementList />
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
              path="/myTeachingCourse/:courseId/gradebook"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingGradebook />
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
              path="/myTeachingCourse/:courseId/assessments/createAssessment"
              element={
                <RequireAuth>
                  <Appbar />
                  <CreateAssessment />
                </RequireAuth>
              }
            />
            <Route
              path="/learnerCourses/:courseId/courseEnrollment"
              element={
                <RequireAuth>
                  <Appbar />
                  <CourseEnrollmentPage />
                </RequireAuth>
              }
            />
            <Route
              path="/learnerCourseDetails/:courseId/successRefundRequest"
              element={
                <RequireAuth>
                  <Appbar />
                  <SuccessRefundRequestPage />
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
              path="/learnerCourseDetails/:courseId/announcements"
              element={
                <RequireAuth>
                  <Appbar />
                  <LearnerAnnouncementList />
                </RequireAuth>
              }
            />
            <Route
              path="/learnerCourses/:courseId/classRunList"
              element={
                <RequireAuth>
                  <Appbar />
                  <ClassRunListPage />
                </RequireAuth>
              }
            />
            <Route
              path="/learnerCourseDetails/:courseId/classRunList"
              element={
                <RequireAuth>
                  <Appbar />
                  <ClassRunListPage />
                </RequireAuth>
              }
            />
            <Route
              path="/learnerCourseDetails/:courseId/files"
              element={
                <RequireAuth>
                  <Appbar />
                  <LearnerCourseFolder />
                </RequireAuth>
              }
            />
            <Route
              path="/courseExplorer/"
              element={
                <RequireAuth>
                  <Appbar />
                  <CourseExplorerPage />
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
              path="/myTeachingCourse/:courseId/courseApproval"
              element={
                <RequireAuth>
                  <Appbar />
                  <CourseApprovalPage />
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
              path="/myTeachingCourse/:courseId/gradebook/:assessmentId"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingGradebookGrading />
                </RequireAuth>
              }
            />

            <Route
              path="/myTeachingCourse/:courseId/gradebook/:assessmentId/:learnerId"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingMarkerPage />
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
              path="/learnerCourseDetails/:courseId/forum"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingForumList />
                </RequireAuth>
              }
            />
            <Route
              path="/learnerCourseDetails/:courseId/forum/:forumId"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingForum />
                </RequireAuth>
              }
            />
            <Route
              path="/learnerCourseDetails/:courseId/forum/:forumId/:discussionId"
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
              path="/whiteboardHomepage"
              element={
                <RequireAuth>
                  <Appbar />
                  <WhiteboardHomepage />
                </RequireAuth>
              }
            />
            <Route
              path="/createWhiteboardHomepage"
              element={
                <RequireAuth>
                  <Appbar />
                  <CreateWhiteboardHomepage />
                </RequireAuth>
              }
            />
            <Route
              path="/viewAllRoomPage"
              element={
                <RequireAuth>
                  <Appbar />
                  <ViewAllRoomPage />
                </RequireAuth>
              }
            />
            <Route
              path="/room/:roomId"
              element={
                <RequireAuth>
                  <Room />
                </RequireAuth>
              }
            />
            <Route
              path="/learnerCourseDetails/:courseId/files/:folderId"
              element={
                <RequireAuth>
                  <Appbar />
                  <LearnerChildFileCover />
                </RequireAuth>
              }
            />

            <Route
              path="/learnerCourseDetails/:courseId/gradebook"
              element={
                <RequireAuth>
                  <Appbar />
                  <LearnerGradeBook />
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
              path="/myTeachingCourse/:courseId/interactiveBook"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingInteractiveBooksList />
                </RequireAuth>
              }
            />
            <Route
              path="/myTeachingCourse/:courseId/interactiveBook/:bookId"
              element={
                <RequireAuth>
                  <Appbar />
                  <TeachingInteractiveBook />
                </RequireAuth>
              }
            />
            <Route
              path="/learnerCourseDetails/:courseId/learnerInteractiveBook"
              element={
                <RequireAuth>
                  <Appbar />
                  <LearnerInteractiveBooksList />
                </RequireAuth>
              }
            />
            <Route
              path="/learnerCourseDetails/:courseId/learnerInteractiveBook/:bookId"
              element={
                <RequireAuth>
                  <Appbar />
                  <LearnerInteractiveBook />
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
              path="/learnerCalendar"
              element={
                <RequireAuth>
                  <Appbar />
                  <LearnerCalendar />
                </RequireAuth>
              }
            />
            <Route
              path="/pointsConfig"
              element={
                <RequireAuth>
                  <Appbar />
                  <OrganisationPointsConfig />
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
            <Route
              path="/myTeachingCourse/:courseId/assessments/createQuiz"
              element={
                <RequireAuth>
                  <Appbar />
                  <CreateQuizForm />
                </RequireAuth>
              }
            />
            <Route
              path="/myTeachingCourse/:courseId/assessments/editQuiz/:assessmentId"
              element={
                <RequireAuth>
                  <Appbar />
                  <EditQuizPage />
                </RequireAuth>
              }
            />
            <Route
              path="/quizAttempt"
              element={
                <RequireAuth>
                  <Appbar />
                  <QuizAttempt />
                </RequireAuth>
              }
            />
            <Route
              path="/fileSubmissionAttempt"
              element={
                <RequireAuth>
                  <Appbar />
                  <FileSubmissionAttempt />
                </RequireAuth>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
