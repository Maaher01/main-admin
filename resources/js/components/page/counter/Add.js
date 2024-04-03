import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Add = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const handleChangestatus = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("status", status);

    await axios
      .post(`/api/counter/add`, formData)
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
        toast("There was an error encountered");
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
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="name"
                label="Counter Name"
                variant="outlined"
                sx={{ marginBottom: "10px" }}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="amount"
                label="Amount"
                variant="outlined"
                sx={{ marginBottom: "10px" }}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
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

export default Add;
