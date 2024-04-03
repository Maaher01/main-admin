import { useState, useEffect, React } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";
import { Link } from "react-router-dom";
import TuneIcon from "@mui/icons-material/Tune";
import WidgetsIcon from "@mui/icons-material/Widgets";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FeedIcon from "@mui/icons-material/Feed";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import SegmentIcon from "@mui/icons-material/Segment";
const drawerWidth = 230;

const ClippedDrawer = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    await axios
      .get(`/api/companysetup`)
      .then(({ data }) => {
        const alldata = data.data[0];
        setName(alldata._name);
        setImageUrl(alldata._image);
      })
      .catch(({ response: { data } }) => {
        toast("No Data Found");
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar
          style={{ minHeight: "69px", borderBottom: "1px solid #d8dbe0" }}
        >
          <Link style={{ textDecoration: "none" }} to="/app/dashboard">
            <img
              src={imageUrl}
              alt="nothing"
              style={{ marginTop: "2px", width: "150px", height: "70px" }}
            />
          </Link>
        </Toolbar>
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/dashboard/companysetup"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Company Setup"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/country"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <FlagIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Clients"} />
                </ListItemButton>
              </ListItem>
            </Link>
            {/* <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/degree"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <WorkspacePremiumIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Degree"} />
                </ListItemButton>
              </ListItem>
            </Link> */}
            {/* <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/university"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary={"University"} />
                </ListItemButton>
              </ListItem>
            </Link> */}
            {/* <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/course"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MenuBookIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Course"} />
                </ListItemButton>
              </ListItem>
            </Link> */}
          </List>
          <Divider />
          <List>
            {/* <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/client"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SupervisedUserCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Client"} />
                </ListItemButton>
              </ListItem>
            </Link> */}
            {/* <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/contact"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PermContactCalendarIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Contact"} />
                </ListItemButton>
              </ListItem>
            </Link> */}
            {/* <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/image"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CameraAltIcon />
                  </ListItemIcon>
                  <ListItemText primary={"University Image"} />
                </ListItemButton>
              </ListItem>
            </Link> */}
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/slider"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TuneIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Slider"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/menu"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <WidgetsIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Menu"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/section"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AddRoadIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Section"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/component"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SegmentIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Component"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/review"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <RemoveRedEyeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Reviews"} />
                </ListItemButton>
              </ListItem>
            </Link>
            {/* <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/faq"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HelpOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Question"} />
                </ListItemButton>
              </ListItem>
            </Link> */}

            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/newsfeed"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <FeedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"News Feed"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/counter"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AddCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Counters"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/recentvisasuccess"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <WorkHistoryIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Recent Visas"} />
                </ListItemButton>
              </ListItem>
            </Link>

            {/* <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/sociallink"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ShareIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Social Link"} />
                </ListItemButton>
              </ListItem>
            </Link> */}

            {/* <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/event"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Event"} />
                </ListItemButton>
              </ListItem>
            </Link> */}

            {/* <Link
              style={{
                textDecoration: "none",
                color: "rgba(44, 56, 74, .681)",
              }}
              to="/app/studentregistration"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AppRegistrationIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Student Reg"} />
                </ListItemButton>
              </ListItem>
            </Link> */}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ClippedDrawer;
