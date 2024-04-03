import { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
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
  const params = useParams();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get(`/api/country/edit/${params.id}`)
      .then(({ data }) => {
        const alldata = data.data;
        setId(alldata.id);
        setName(alldata._name);
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
      .post(`/api/country/update/${params.id}`, formData)
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
        <Box component={"form"} onSubmit={handleSubmit}>
          <Grid container sx={{ padding: "0 40px" }}>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="name"
                label="Country Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ marginBottom: "10px" }}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={11} sx={{ mt: 2 }}>
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

            <Grid item xs={11}>
              {imageUrl && (
                <img src={imageUrl} alt="Uploaded Image" height="150" />
              )}
            </Grid>

            <Grid item xs={11}>
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
