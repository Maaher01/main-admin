import { useState,useEffect,React } from "react";

import {
    Box, 
    Button,
    Container,
    TextField,
    CssBaseline,
    Typography
} from "@mui/material";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);

        const loginCredentials = {
            email: formData.get('email'),
            password: formData.get('password')
        }


        axios.post('/api/login', loginCredentials).then(function(response){
            
            sessionStorage.clear();
            sessionStorage.setItem("authenticated", true);
            toast("Login Successful");
            navigate("/app/dashboard");
            
        }).catch(function (error) {
               // console.log(error);
                toast(error.message);
        });

    }

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    return (
        <Container maxWidth={"xs"}>
            <CssBaseline/>

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <Card>
                    <CardContent>
                    
                        <Typography component={"h1"} variant={"h5"} align="center">
                            Login
                        </Typography>
                        <Box component={"form"} onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                fullWidth
                                variant={"outlined"}
                                type={"submit"}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}

export default Login