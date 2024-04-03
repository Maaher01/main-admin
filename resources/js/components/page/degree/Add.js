import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import { toast } from "react-toastify";

const Add = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    axios
      .post("/api/degree/add", formData)
      .then(function (response) {
        if (response.data.errors) {
          toast(response.data.message);
        } else {
          toast("Data Inserted Successful");
        }
        // navigate("/app/dashboard");
      })
      .catch(function (error) {
        console.log(error.message);
        toast("An Error Occured");
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
                sx={{ marginBottom: "10px" }}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="standard-basic"
                fullWidth
                name="subtitle"
                label="Subtitle"
                variant="outlined"
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

export default Add;
