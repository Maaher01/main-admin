import { useState, useEffect, React } from "react";
import { Box, Button } from "@mui/material";
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

const Add = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [img, setImg] = useState();
  const [universityid, setUniversityid] = useState();
  const [universitylist, setUniversitylist] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("image", img);
    formData.append("universityid", universityid);
    axios
      .post("/api/image/add", formData)
      .then(function (response) {
        if (response.data.errors) {
          toast(response.data.message);
        } else {
          toast("Data Inserted Successful");
        }
      })
      .catch(function (error) {
        console.log(error.message);
        toast("hello");
      });
  };

  useEffect(() => {
    fetchUniversity();
  }, []);

  const handleChangeuniversity = (event) => {
    setUniversityid(event.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImg(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
    image;
  };

  const fetchUniversity = async () => {
    axios
      .get("/api/university")
      .then((response) => {
        setUniversitylist(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Layout>
        <Box component={"form"} onSubmit={handleSubmit}>
          <Grid container sx={{ padding: "0 40px" }}>
            <Grid item xs={8}>
              <FormControl variant="outlined" sx={{ minWidth: 1000 }}>
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

export default Add;
