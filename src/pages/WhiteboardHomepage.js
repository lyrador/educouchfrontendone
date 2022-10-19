import React from 'react';
import ShowChooseNamePanel from '../components/WhiteboardComponents/ShowChooseNamePanel';
import styles from '../css/layout.module.scss';

export default function WhiteboardHomepage() {  
  return <div style={{background: '#15171A', position: 'absolute', height: '100vh', width: '100vw', left: 0, top: 0}}>
	  <ShowChooseNamePanel/>
  </div>
}