import { useState, useEffect, React } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Layout from "../layout/Layout";
import BackupIcon from "@mui/icons-material/Backup";
function Companysetup() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [latlong, setLatlong] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    await axios
      .get(`/api/companysetup`)
      .then(({ data }) => {
        const alldata = data.data[0];
        setId(alldata.id);
        setName(alldata._name);
        setEmail(alldata._email);
        setPhone(alldata._phone);
        setMobile(alldata._mobile);
        setLatlong(alldata._latlong);
        setWebsite(alldata._website);
        setImageUrl(alldata._image);
        setDescription(alldata._description);
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
    if (id == null) {
      axios
        .post("/api/companysetup", formData)
        .then(function (response) {
          toast("Data Inserted Successful");
          // navigate("/app/dashboard");
        })
        .catch(function (error) {
          console.log(error);
          //toast(errors);
        });
    } else {
      axios
        .post(`/api/companysetup/${id}`, formData)
        .then(function (response) {
          toast("Update Successful");
          // navigate("/app/dashboard");
        })
        .catch(function (error) {
          console.log(error);
          //toast(errors.message);
        });
    }
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
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="name"
                label="Company Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ marginBottom: "10px" }}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="phone"
                label="Phone"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ marginBottom: "10px" }}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="email"
                label="Emial"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ marginBottom: "10px" }}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="mobile"
                label="Mobile"
                variant="outlined"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                sx={{ marginBottom: "10px" }}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="website"
                label="Website"
                variant="outlined"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                sx={{ marginBottom: "10px" }}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="latlong"
                label="Map LatLong"
                variant="outlined"
                value={latlong}
                onChange={(e) => setLatlong(e.target.value)}
                sx={{ marginBottom: "10px" }}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="description"
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ marginBottom: "10px" }}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
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
}

export default Companysetup;
