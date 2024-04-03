import { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Layout from "../../layout/Layout";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Edit = () => {
  const [status, setStatus] = useState("");
  const [courseid, setCourseid] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [courselist, setCourselist] = useState([]);
  const params = useParams();

  const handleChangecourse = (event) => {
    setCourseid(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("course", courseid);
    axios
      .post(`/api/faq/update/${params.id}`, formData)
      .then(function (response) {
        if (response.data.errors) {
          toast(response.data.message);
        } else {
          toast("Data Updated Successfully");
        }
        // navigate("/app/dashboard");
      })
      .catch(function (error) {
        console.log(error.message);
        toast("hello");
      });
  };

  useEffect(() => {
    fetchcourse();
    fetchData();
  }, []);

  const fetchcourse = async () => {
    axios
      .get("/api/course")
      .then((response) => {
        setCourselist(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangestatus = (event) => {
    setStatus(event.target.value);
  };

  const fetchData = async () => {
    await axios
      .get(`/api/faq/edit/${params.id}`)
      .then(({ data }) => {
        const alldata = data.data;
        setQuestion(alldata._question);
        setAnswer(alldata._answer);
        setCourseid(alldata._courseid);
        setStatus(alldata._status);
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="question"
                value={question}
                label="Question"
                variant="outlined"
                onChange={(e) => setQuestion(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                fullWidth
                name="answer"
                value={answer}
                label="Answer"
                variant="outlined"
                onChange={(e) => setAnswer(e.target.value)}
                InputProps={{ style: { backgroundColor: "white" } }}
                multiline
                maxRows={10}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" sx={{ minWidth: 1000 }}>
                <InputLabel>Course</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  value={courseid}
                  onChange={handleChangecourse}
                  label="Course"
                  name="course"
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {courselist.map((course_list) => (
                    <MenuItem value={course_list.id}>
                      {course_list._title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" sx={{ minWidth: 1000 }}>
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
            <Grid item xs={6}>
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
