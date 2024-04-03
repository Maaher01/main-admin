import { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import BackupIcon from "@mui/icons-material/Backup";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [status, setStatus] = useState("");
  const [menuid, setMenuid] = useState();
  const [menulist, setMenulist] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [videourl, setVideourl] = useState("");
  const [position, setPosition] = useState("");
  const [img, setImg] = useState("");

  const handleChangestatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangemenu = (event) => {
    setMenuid(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("status", status);
    formData.append("menu", menuid);
    formData.append("image", img);

    axios
      .post(`/api/section/update/${params.id}`, formData)
      .then(function (response) {
        if (response.data.errors) {
          toast(response.data.message);
        } else {
          toast("Data Updated Successful");
        }
        // navigate("/app/dashboard");
      })
      .catch(function (error) {
        console.log(error.message);
        toast("An Error Occured");
      });
  };

  const fetchMenu = async () => {
    axios
      .get("/api/menu")
      .then((response) => {
        setMenulist(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMenu();
    fetchData();
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImg(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const fetchData = async () => {
    await axios
      .get(`/api/section/edit/${params.id}`)
      .then(({ data }) => {
        const alldata = data.data;
        setTitle(alldata._title);
        setSubtitle(alldata._subtitle);
        setLink(alldata._link);
        setVideourl(alldata._videourl);
        setPosition(alldata._sort);
        setMenuid(alldata._menuid);
        setStatus(alldata._status);
        setImageUrl(alldata._image);
        setDescription(alldata._description);
        toast("Data Found");
      })
      .catch(({ response: { data } }) => {
        toast("No Data Found");
      });
  };

  return (
    <>
      <Layout>
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{ padding: "20px 60px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                fullWidth
                name="title"
                value={title}
                label="Title"
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                fullWidth
                name="subtitle"
                value={subtitle}
                label="Sub Title"
                variant="outlined"
                onChange={(e) => setSubtitle(e.target.value)}
                multiline
                maxRows={10}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="videourl"
                value={videourl}
                label="Video Url"
                variant="outlined"
                onChange={(e) => setVideourl(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="link"
                value={link}
                label="Link"
                variant="outlined"
                onChange={(e) => setLink(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                fullWidth
                name="description"
                value={description}
                label="Description"
                variant="outlined"
                onChange={(e) => setDescription(e.target.value)}
                multiline
                maxRows={10}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="position"
                value={position}
                label="Position"
                variant="outlined"
                onChange={(e) => setPosition(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="outlined" sx={{ minWidth: 494 }}>
                <InputLabel>Menu</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  value={menuid}
                  onChange={handleChangemenu}
                  label="Menu"
                  name="menu"
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value="0">
                    <em>None</em>
                  </MenuItem>
                  {menulist.map((menu_list) => (
                    <MenuItem value={menu_list.id}>{menu_list._title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" sx={{ minWidth: 494 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  value={status}
                  onChange={handleChangestatus}
                  label="Status"
                  name="status"
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="2">In Active</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<BackupIcon />}
              component="label"
              sx={{ marginBottom: "30px" }}
            >
              {" "}
              Upload Logo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileUpload}
              />
            </Button>
          </Grid>
          <Grid item xs={6}>
            {imageUrl && (
              <img src={imageUrl} alt="Uploaded Image" height="150" />
            )}
          </Grid>
          <Grid item xs={6}>
            <Button variant={"contained"} type={"submit"} sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Grid>
        </Box>
      </Layout>
    </>
  );
};

export default Edit;
