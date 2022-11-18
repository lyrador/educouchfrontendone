import * as React from "react";
import Box from "@mui/material/Box";
import { useAuth } from "../context/AuthProvider";
import { Button, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { TabPanel } from "@material-ui/lab";
import ReelCardItem from "../components/ReelCardItem";

export default function InstructorReelsPage(props) {
  const auth = useAuth();
  const user = auth.user;
  const instructorId = user.userId;
  const [reels, setReels] = React.useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  React.useEffect(() => {
    console.log(user);
    fetch(
      "http://localhost:8080/reel/getAllReelsByInstructorId/" + instructorId
    )
      .then((res) => res.json())
      .then((result) => {
        setReels(result);
        console.log("reels fetched: ", result);
      });
  }, []);

  return (
    <>
      <h1> instructor reels</h1>
      <Button variant="contained" >Create Reel</Button>

      <div className="cards">
        <div className="cards-container">
          <Box sx={{ width: "100%" }}>
            <div style={{ paddingLeft: "3%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                ></Tabs>
              </Box>
            </div>
            <TabPanel value={value} index={0}>
              <div className="cards-wrapper">
                <ul className="cards-items">
                  {reels.length == 0 ? (
                    <p>no reels avail</p>
                  ) : (
                    reels.map((reel) => (
                      <ReelCardItem
                        src="images/computing.jpg"
                        reelTitle={reel.reelTitle}
                        reelStatusEnum={reel.reelApprovalStatusEnum}
                        reelNumLikes={reel.numLikes}
                        reelNumViews={reel.numViews}
                      />
                    ))
                  )}
                </ul>
              </div>
            </TabPanel>
          </Box>
        </div>
      </div>
    </>
  );
}
