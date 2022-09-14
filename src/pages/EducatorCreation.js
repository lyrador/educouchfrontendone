import * as React from 'react';
import CreateInstructorForm from '../components/CreateInstructorForm';
import Learner from '../components/Learner';
import SettingsDrawer from '../components/SettingsDrawer';

export default function EducatorCreation() {

  return (
    <>
    <SettingsDrawer></SettingsDrawer>
    Educator
    <CreateInstructorForm></CreateInstructorForm>
    </>
  );
}
