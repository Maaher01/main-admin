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
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
function Add() {
    const navigate = useNavigate();
    const [status, setStatus] = useState("");
    const [countryid, setCountryid] = useState();
    const [passport, setPassport] = useState();
    const [qualification, setQualification] = useState();
    const [ielts, setIelts] = useState();
    const [dob, setDob] = useState();

    const [countrylist, setCountrylist] = useState([]);
    const handleChangecountry = (event) => {
        setCountryid(event.target.value);
    };

    const handleChangequalification = (event) => {
        setQualification(event.target.value);
    };

    const handleChangepassport = (event) => {
        setPassport(event.target.value);
    };

    const handleChangeielts = (event) => {
        setIelts(event.target.value);
    };

    const handleChangestatus = (event) => {
        setStatus(event.target.value);
  };

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        formData.append('status', status);
        formData.append('countryid', countryid);
        formData.append('passport', passport);
        formData.append('qualification', qualification);
        formData.append('ielts', ielts);
        formData.append('dob', dob);

        axios.post('/api/studentregistration/add', formData).then(function(response){
            console.log(response);
            if(response.data.errors){
                toast(response.data.message);
            }else{
                toast("Registration Successful");
            }
            // navigate("/app/dashboard"); 
        }).catch(function (error) {
            console.log(error.message);
            toast("hello");
        });
    }


    useEffect(() => {
        axios.get('/api/country')
        .then(response => {

        console.log(response);
        setCountrylist(response.data.data.data);
        })
        .catch(error => {
            console.error(error);
        });
        
    }, []);

    return (
        <>
            <Layout>
                <Box component={"form"} onSubmit={handleSubmit}>
                    <Grid container>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <TextField id="standard-basic" fullWidth  name="name" label="Full Name" variant="standard"/>
                            </Grid>
                            <Grid item xs={1}></Grid >
                            <Grid item xs={11} sx={{ mt: 2}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="Date of Birth" 
                                      value={dob}
                                      onChange={(newValue) => setDob(newValue)} format="YYYY-MM-DD"
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <TextField id="standard-basic" fullWidth  name="email" label="Email" variant="standard"/>
                            </Grid>

                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <TextField id="standard-basic" fullWidth  name="mobile" label="Mobile" variant="standard"/>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <FormControl variant="standard" sx={{minWidth: 1000 }}>
                                <InputLabel>Country</InputLabel>
                                <Select
                                  labelId="demo-simple-select-standard-label"
                                  value={countryid}
                                  onChange={handleChangecountry}
                                  label="Country" >
                                    {countrylist?.map((country) => (
                                        <MenuItem value={country.id}><em>{country._name}</em></MenuItem>
                                    ))}  
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <FormControl variant="standard" sx={{minWidth: 1000 }}>
                                    <InputLabel>Qualification</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-standard-label"
                                    value={qualification}
                                    onChange={handleChangequalification}
                                    label="Status" name="status">
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value="SSC">SSC / O LEVEL</MenuItem>
                                        <MenuItem value="HSC">HSC / A LEVEL</MenuItem>
                                        <MenuItem value="BACHELOR">BACHELOR</MenuItem>
                                        <MenuItem value="MASTERS">MASTERS</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <FormControl variant="standard" sx={{minWidth: 1000 }}>
                                    <InputLabel>Have IELTS / PTE ?</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-standard-label"
                                    value={ielts}
                                    onChange={handleChangeielts}
                                    label="Status" name="status">
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value="1">Yes</MenuItem>
                                        <MenuItem value="2">No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={1}></Grid>
                            <Grid item xs={11}>
                                <FormControl variant="standard" sx={{minWidth: 1000 }}>
                                    <InputLabel>Passport availability ?</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-standard-label"
                                    value={passport}
                                    onChange={handleChangepassport}
                                    label="Status">
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value="1">Yes</MenuItem>
                                        <MenuItem value="2">No</MenuItem>
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
                                  label="Status">
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