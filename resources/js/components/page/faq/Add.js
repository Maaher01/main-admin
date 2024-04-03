import { useState,useEffect,React } from "react";

import {
    Box, 
    Button,
    Container,
    TextField,
    CssBaseline,
    Typography
} from "@mui/material";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Layout from "../../layout/Layout";
import BackupIcon from '@mui/icons-material/Backup';
import { toast } from 'react-toastify';
import { spacing } from '@mui/system';

function Add() {
    const navigate = useNavigate();
    const [status, setStatus] = useState("");
    const [courseid, setCourseid] = useState();
    const [courselist, setCourselist] = useState([]);

    const handleChangecourse = (event) => {
        setCourseid(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        
        formData.append('course', courseid);
        
        axios.post('/api/faq/add', formData).then(function(response){
            if(response.data.errors){
                toast(response.data.message);
            }else{
                toast("Data Inserted Successful");
            }
           // navigate("/app/dashboard"); 
        }).catch(function (error) {
            console.log(error.message);
            toast("hello");
        });
    }

    useEffect(() => {
        fetchcourse();
    }, [])

  
    const fetchcourse = async() => {
        axios.get('/api/course').then((response) => {
            setCourselist(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }

   const handleChangestatus = (event) => {
        setStatus(event.target.value);
    };
    

    return (
        <>
            <Layout>
                <Box component={"form"} onSubmit={handleSubmit}>
                    <Grid container>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <TextField id="standard-basic" fullWidth  name="question" label="Qestion" variant="standard"/>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <TextField id="standard-basic" fullWidth  name="answer" label="Answer" variant="standard" multiline
          maxRows={10}/>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <FormControl variant="standard" sx={{minWidth: 1000 }}>
                                <InputLabel>Course</InputLabel>
                                <Select
                                  labelId="demo-simple-select-standard-label"
                                  value={courseid}
                                  onChange={handleChangecourse}
                                  label="Country" name="course">
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  {courselist.map((course_list) => (
                                    <MenuItem value={course_list.id}>{course_list._title}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <FormControl variant="standard" sx={{minWidth: 1000 }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                  labelId="demo-simple-select-standard-label"
                                  value={status}
                                  onChange={handleChangestatus}
                                  label="Status" name="status">
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="1">Active</MenuItem>
                                    <MenuItem value="2">In Active</MenuItem>
                                </Select>
                              </FormControl>
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
    )
}

export default Add