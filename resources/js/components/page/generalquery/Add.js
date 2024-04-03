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
    
    
    const handleChangestatus = (event) => {
        setStatus(event.target.value);
    };

    

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        formData.append('status', status);
        axios.post('/api/generalquery/add', formData).then(function(response){
            if(response.data.errors){
                toast(response.data.message);
            }else{
                toast("Data Inserted Successful");
            }
           // navigate("/app/dashboard"); 
        }).catch(function (error) {
            console.log(error.message);
            toast("An Error Occured");
        });
    }

    return (
        <>
            <Layout>
                <Box component={"form"} onSubmit={handleSubmit}>
                    <Grid container>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <TextField id="standard-basic" fullWidth  name="firstname" label="First Name" variant="standard"/>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <TextField id="standard-basic" fullWidth  name="lastname" label="Last Name" variant="standard"/>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <TextField id="standard-basic" fullWidth  name="email" label="Email" variant="standard"/>
                            </Grid>

                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <TextField id="standard-basic" fullWidth  name="phone" label="Phone" variant="standard"/>
                            </Grid>

                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <TextField id="standard-basic" fullWidth  name="message" label="Message" variant="standard" multiline
          maxRows={10}/>
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