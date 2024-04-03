import { useState, useEffect, React } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import { useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const params = useParams();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get(`/api/degree/edit/${params.id}`)
      .then(({ data }) => {
        const alldata = data.data;
        setTitle(alldata._title);
        setSubtitle(alldata._subtitle);
        toast("Data Found");
      })
      .catch(({ response: { data } }) => {
        toast("No Data Found");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    axios
      .post(`/api/degree/update/${params.id}`, formData)
      .then(function (response) {
        if (response.data.errors) {
          toast(response.data.message);
        } else {
          toast("Data Updated Successful");
        }
      })
      .catch(function (error) {
        console.log(error);
        //toast("problem");
      });
  };

  return (
    <>
      <Layout>
        <Box component={"form"} onSubmit={handleSubmit}>
          <Grid container sx={{ padding: "0 40px" }}>
            <Grid item xs={8}>
              <TextField
                id="standard-basic"
                fullWidth
                name="title"
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ marginBottom: "20px" }}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="standard-basic"
                fullWidth
                name="subtitle"
                label="Sub Title"
                variant="outlined"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
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
