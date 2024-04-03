import { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import BackupIcon from "@mui/icons-material/Backup";
import { useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [videourl, setVideourl] = useState("");
  const params = useParams();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get(`/api/university/edit/${params.id}`)
      .then(({ data }) => {
        const alldata = data.data;
        setId(alldata.id);
        setName(alldata._name);
        setAddress(alldata._address);
        setVideourl(alldata._videourl);
        setImageUrl(alldata._image);
        toast("Data Found");
      })
      .catch(({ response: { data } }) => {
        toast("No Data Found");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("image", img);
    axios
      .post(`/api/university/update/${params.id}`, formData)
      .then(function (response) {
        if (response.data.errors) {
          toast(response.data.message);
        } else {
          toast("Data Inserted Successful");
        }
      })
      .catch(function (error) {
        console.log(error);
        //toast("problem");
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImg(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
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
            <Grid item xs={8}>
              <TextField
                id="standard-basic"
                fullWidth
                name="name"
                label="University Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="standard-basic"
                fullWidth
                name="address"
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="standard-basic"
                fullWidth
                name="videourl"
                label="Video Url"
                variant="outlined"
                value={videourl}
                onChange={(e) => setVideourl(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={8} sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<BackupIcon />}
                component="label"
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
            <Grid item xs={8}>
              {imageUrl && (
                <img src={imageUrl} alt="Uploaded Image" height="150" />
              )}
            </Grid>
            <Grid item xs={8}>
              <Button
                variant={"contained"}
                type={"submit"}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Layout>
    </>
  );
};

export default Edit;
