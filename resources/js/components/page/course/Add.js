import { useState, useEffect, React } from "react";
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
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Add = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [countryid, setCountryid] = useState();
  const [degreeid, setDegreeid] = useState();
  const [universityid, setUniversityid] = useState();

  const [countrylist, setCountrylist] = useState([]);
  const [degreelist, setDegreelist] = useState([]);
  const [universitylist, setUniversitylist] = useState([]);
  const [fromdate, setFromdate] = useState(dayjs());
  const [todate, setTodate] = useState(dayjs());

  const handleChangecountry = (event) => {
    setCountryid(event.target.value);
  };

  const handleChangedegree = (event) => {
    setDegreeid(event.target.value);
  };

  const handleChangeuniversity = (event) => {
    setUniversityid(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("image", img);
    formData.append("countryid", countryid);
    formData.append("degreeid", degreeid);
    formData.append("universityid", universityid);
    formData.append("fromdate", fromdate);
    formData.append("todate", todate);

    axios
      .post("/api/course/add", formData)
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
        toast("hello");
      });
  };

  useEffect(() => {
    fetchCountry();
    fetchUniversity();
    fetchDegree();
  }, []);

  const fetchCountry = async () => {
    axios
      .get("/api/country")
      .then((response) => {
        console.log(response);
        setCountrylist(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchUniversity = async () => {
    axios
      .get("/api/alluniversity")
      .then((response) => {
        setUniversitylist(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchDegree = async () => {
    axios
      .get("/api/degree")
      .then((response) => {
        setDegreelist(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
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
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="title"
                label="Course Title"
                variant="outlined"
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="subtitle"
                label="Course Subtitle"
                variant="outlined"
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
                InputProps={{ style: { backgroundColor: "white" } }}
                multiline
                maxRows={10}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="livingcost"
                label="Living Cost"
                variant="outlined"
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="tutionfees"
                label="Tution Fees"
                variant="outlined"
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="applicationfees"
                label="Application Fees"
                variant="outlined"
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="programintake"
                label="Program Intake"
                variant="outlined"
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="credit"
                label="Credit"
                variant="outlined"
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="duration"
                label="Duration"
                variant="outlined"
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From Date"
                  value={fromdate}
                  onChange={(newValue) => setFromdate(newValue)}
                  format="YYYY-MM-DD"
                  sx={{ minWidth: 494, backgroundColor: "white" }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="To Date"
                  value={todate}
                  onChange={(newValue) => setTodate(newValue)}
                  format="YYYY-MM-DD"
                  sx={{ minWidth: 494, backgroundColor: "white" }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <FormControl
                variant="outlined"
                InputProps={{ style: { backgroundColor: "white" } }}
                sx={{ minWidth: 494 }}
              >
                <InputLabel>Country</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  value={countryid}
                  onChange={handleChangecountry}
                  label="Country"
                  name="country"
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {countrylist.map((country_id) => (
                    <MenuItem value={country_id.id}>
                      {country_id._name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" sx={{ minWidth: 494 }}>
                <InputLabel>Degree</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  value={degreeid}
                  onChange={handleChangedegree}
                  label="Degree"
                  name="degree"
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {degreelist.map((degree_id) => (
                    <MenuItem value={degree_id.id}>{degree_id._title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" sx={{ minWidth: 494 }}>
                <InputLabel>University</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  value={universityid}
                  onChange={handleChangeuniversity}
                  label="University"
                  name="university"
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {universitylist.map((university_id) => (
                    <MenuItem value={university_id.id}>
                      {university_id._name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item xs={6} sx={{ mt: 2 }}>
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
          <Grid item xs={6}>
            {imageUrl && (
              <img src={imageUrl} alt="Uploaded Image" height="150" />
            )}
          </Grid>
          <Grid item xs={6}>
            <Button variant={"outlined"} type={"submit"} sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Grid>
        </Box>
      </Layout>
    </>
  );
};

export default Add;
