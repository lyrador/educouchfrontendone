import React, { useState, useEffect } from 'react'
import '../App.css';
import CardItem from './CardItem';
import '../css/CardItem.css'

import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';


function TeachingCoursesCards() {

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
    
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      };
    
      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
    
      const [value, setValue] = React.useState(0);
      const [courses, setCourses] = useState([])
    
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      React.useEffect(() => {
        fetch("http://localhost:8080/course/courses").
        then(res=>res.json()).
        then((result)=>{
          setCourses(result);
        }
      )
      }, [])

      console.log(courses)

  return (
    <>
        <div className='cards'>
            <div className='cards-container'>
                <Box sx={{ width: '100%'}}>
                    <div style={{paddingLeft: '3%'}}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Drafts" {...a11yProps(0)} />
                            {/* <Tab label="Ongoing" {...a11yProps(1)} />
                            <Tab label="Completed" {...a11yProps(2)} /> */}
                        </Tabs>
                        </Box>
                    </div>
                    <TabPanel value={value} index={0}>
                      <div className='cards-wrapper'>
                        <ul className='cards-items'>
                          {courses.map(course=>(
                              <CardItem src="images/computing.jpg" 
                              text={course.courseTitle}
                              label={course.courseCode}
                              courseId={course.courseId}
                              />
                            ))
                          }
                          </ul>
                      </div>
                    </TabPanel>
                    {/* <TabPanel value={value} index={1}>
                        <div className='cards-wrapper'>
                          <ul className='cards-items'>
                              <CardItem 
                              src="images/soc.jpg"
                              text="SC1233 Society and Sociology"
                              label='Sociology'
                              // moduleCode="SC1233"
                              />
                          </ul>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <div className='cards-wrapper'>
                        <ul className='cards-items'>
                            <CardItem 
                            src="images/computing.jpg"
                            text="CS1010 Introduction to Computer Science"
                            label='Computing'
                            // moduleCode="CS1010"
                            />
                        </ul>
                      </div>
                    </TabPanel> */}
                </Box>
            </div>
        </div>
    </>
  )
}

export default TeachingCoursesCards;