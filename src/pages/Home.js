import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useAuth } from '../context/AuthProvider';
import { AuthProvider } from '../context/AuthProvider';
import WebPet from "web-pet";

export default function Home() {
  
  return (
    <>
      <div style={{ justifyContent: 'center', textAlign: 'center'}}>
        <div style={{width: '100%'}}>
          <img src="https://educouchbucket.s3.ap-southeast-1.amazonaws.com/educouchlogo.png" style={{ height: 200, width: 300, borderRadius: 30 }} />
        </div>
        <div style={{padding: '50px 400px'}}>
          <Typography variant="h5" color="text.primary" 
          // style={{ textDecoration: 'underline' }}
          >
            Welcome to EduCouch Portal! This page is still working in progress.
            <br></br>
            Navigate to the other pages by clicking on the items in the navigation bar above!
          </Typography>
        </div>
      </div>
    </>
  );
}
