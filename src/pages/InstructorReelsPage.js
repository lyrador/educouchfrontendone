import * as React from "react";
import Box from "@mui/material/Box";
import { useAuth } from "../context/AuthProvider";
import {
  Breadcrumbs,
  Button,
  Grid,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { TabPanel } from "@material-ui/lab";
import ReelCardItem from "../components/ReelComponents/ReelCardItem";
import { Link, useNavigate } from "react-router-dom";
import LinkMaterial from "@mui/material/Link";


export default function InstructorReelsPage(props) {
  const auth = useAuth();
  const user = auth.user;
  const instructorId = user.userId;
  const navigate = useNavigate();
  const [reels, setReels] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [courseId, setCourseId] = React.useState(1);
  const [refresh, setRefresh] = React.useState(false);

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

  //not tested
  function handleCreateReel() {
    fetch("http://localhost:8080/reel/createReel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reelTitle: " ",
        reelCaption: " ",
        courseId: courseId,
        instructorId: instructorId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("created Reel: ", result);
        navigate(`/createReel`, {
          state: {
            reelId: result.reelId,
            courseId: courseId,
          },
        });
      });
  }

  const [query, setQuery] = React.useState("");
  function queryFunction(text) {
    setQuery(text);
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
      <h1>Instructor Reels</h1>

      <div className="cards">
        <Box sx={{ width: "100%" }}>
          <div style={{ paddingLeft: "3%" }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                to={`/instructorReels`}
                state={{
                  viewAllReelsPath: "/instructorReels",
                }}
                style={{ textDecoration: "none", color: "grey" }}
              >
                <LinkMaterial underline="hover" color="inherit">
                  View All Reels
                </LinkMaterial>
              </Link>
            </Breadcrumbs>
            <Box
              sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 5 }}
            >
              <Tabs
                value={value}
                // onChange={handleChange}
                aria-label="basic tabs example"
              ></Tabs>
            </Box>
            <Button variant="contained" onClick={handleCreateReel}>
              Create Reel
            </Button>
          </div>
          <TabPanel value={value} index={0}>
            <div className="cards-wrapper">
              <Grid>
                <div className="search">
                  {reels.length > 0 && (
                    <TextField
                      type="text"
                      variant="outlined"
                      placeholder="Search..."
                      value={query}
                      style={{
                        float: "left",
                        marginLeft: "22px",
                        height: "50px",
                        fontSize: "16pt",
                        paddingLeft: "9px",
                      }}
                      onChange={(e) => queryFunction(e.target.value)}
                    />
                  )}
                </div>
              </Grid>
              <ul className="cards-items">
                {reels.length == 0 ? (
                  <h3
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #FF8300, #A3C4BC)",
                      color: "white",
                      padding: "20px",
                      width: "60%",
                      borderRadius: "10px",
                      marginLeft: "30px",
                    }}
                  >
                    No Reels Yet!
                  </h3>
                ) : (
                  reels
                    .filter(
                      (reel) =>
                        reel.reelApprovalStatusEnum
                          .toLowerCase()
                          .includes(query) ||
                        reel.reelTitle.toLowerCase().includes(query) ||
                        reel.reelCaption.toLowerCase().includes(query)
                    )
                    .reverse()
                    .map((reel) => (
                      <ReelCardItem
                        src="images/computing.jpg"
                        reelId={reel.reelId}
                        reelTitle={reel.reelTitle}
                        reelCaption={reel.reelCaption}
                        reelApprovalStatusEnum={reel.reelApprovalStatusEnum}
                        reelNumLikes={reel.numLikes}
                        reelNumViews={reel.numViews}
                        video={reel.video}
                        reelCreator={reel.reelCreator.name}
                      />
                    ))
                )}
              </ul>
            </div>
          </TabPanel>
        </Box>
      </div>
    </>
  );
}
