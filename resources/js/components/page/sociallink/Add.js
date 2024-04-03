import { useState,useEffect,React } from "react";

import {
    Box, 
    Button,
    Container,
    TextField,
    CssBaseline,
    Typography
} from "@mui/material";

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
    
   
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        
        axios.post('/api/sociallink/add', formData).then(function(response){
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
                                <TextField id="standard-basic" fullWidth  name="title" label="Title" variant="standard"/>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <TextField id="standard-basic" fullWidth  name="url" label="URL" variant="standard"/>
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