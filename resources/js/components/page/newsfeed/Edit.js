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
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Add = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [status, setStatus] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [publishdate, setPublishdate] = useState(dayjs());

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
    formData.append("image", img);
    formData.append("date", publishdate);
    axios
      .post(`/api/newsfeed/update/${params.id}`, formData)
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

  useEffect(() => {
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
      .get(`/api/newsfeed/edit/${params.id}`)
      .then(({ data }) => {
        const alldata = data.data;
        setTitle(alldata._title);
        setSubtitle(alldata._subtitle);
        setStatus(alldata._status);
        setImageUrl(alldata._image);
        setPublishdate(dayjs(alldata._date));
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
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              <TextField
                id="standard-basic"
                fullWidth
                name="title"
                value={title}
                label="Title"
                variant="standard"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              <TextField
                id="standard-basic"
                fullWidth
                name="subtitle"
                value={subtitle}
                label="Sub Title"
                variant="standard"
                onChange={(e) => setSubtitle(e.target.value)}
                multiline
                maxRows={10}
              />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={11} sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={publishdate}
                  onChange={(newValue) => setPublishdate(newValue)}
                  format="YYYY-MM-DD"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              <FormControl variant="standard" sx={{ minWidth: 1000 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  value={status}
                  onChange={handleChangestatus}
                  label="Status"
                  name="status"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="2">In Active</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={1} sx={{ mt: 10 }}></Grid>
            <Grid item xs={11} sx={{ mt: 2 }}>
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
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              {imageUrl && (
                <img src={imageUrl} alt="Uploaded Image" height="150" />
              )}
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              <Button
                variant={"outlined"}
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
