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
import { toast } from "react-toastify";

const Add = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [menuid, setMenuid] = useState();
  const [menulist, setMenulist] = useState([]);

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
    formData.append("parentmenu", menuid);

    axios
      .post("/api/menu/add", formData)
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
  }, []);

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
                name="title"
                label="Title"
                variant="outlined"
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="url"
                label="Slag"
                variant="outlined"
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="menuposition"
                label="Menu Position"
                variant="outlined"
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="outlined" sx={{ minWidth: 494 }}>
                <InputLabel>Parent Menu</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  value={menuid}
                  onChange={handleChangemenu}
                  label="Parentmenu"
                  name="parentmenu"
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
