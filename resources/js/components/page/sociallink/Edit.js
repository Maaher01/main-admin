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
import { Link ,useParams} from 'react-router-dom';
function Add() {
    const navigate = useNavigate();
    const params = useParams();
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    
    

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        
        
        axios.post(`/api/sociallink/update/${params.id}`, formData).then(function(response){
            if(response.data.errors){
                toast(response.data.message);
            }else{
                toast("Data Updated Successful");
            }
           // navigate("/app/dashboard"); 
        }).catch(function (error) {
            console.log(error.message);
            toast("An Error Occured");
        });
    }

    

    

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await axios.get(`/api/sociallink/edit/${params.id}`).then(({data})=>{
            const alldata = data.data;
            setTitle(alldata._title);
            setUrl(alldata._url);     
            toast("Data Found");
        }).catch(({response:{data}})=>{
            toast("No Data Found");
        })
    }

    return (
        <>
            <Layout>
                <Box component={"form"} onSubmit={handleSubmit}>
                    <Grid container>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <TextField id="standard-basic" fullWidth  name="title" value={title} label="Title" variant="standard" onChange={(e) => setTitle(e.target.value)}/>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <TextField id="standard-basic" fullWidth  name="url" value={url} label="URL" variant="standard" onChange={(e) => setUrl(e.target.value)}/>
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