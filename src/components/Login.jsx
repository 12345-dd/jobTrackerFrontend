import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { showError, showSuccess } from '../utils/toast'
import axios from 'axios'
import { setToken } from '../utils/auth'

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" })
    const navigate = useNavigate()

    const submitHandler = async (data) => {
        try {
            const res = await axios.post("https://jobtrackerbackend-6gxo.onrender.com/login", data);
            setToken(res.data.token);
            showSuccess("Login Successful");
            setTimeout(() => {
                navigate("/")
            }, 3000)
        } catch (err) {
            showError(err.response?.data?.message || "Login Failed")
        }
    }

    return (
        <>
            <Navbar />
            <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop:"40px"
                }}
            >
                <Box
                    sx={{
                        border: '2px solid black',
                        borderRadius: 2,
                        padding: 4,
                        width: '90%',       
                        maxWidth: 600,         
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant='h5' mb={3}>Login</Typography>
                    <form onSubmit={handleSubmit(submitHandler)} noValidate style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            label="E-mail"
                            margin='normal'
                            {...register("email", { required: "E-mail is required" })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type='password'
                            margin='normal'
                            {...register("password", { required: "Password is required" })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <Button variant="contained" sx={{ mt: 2 }} type="submit" fullWidth>
                            Login
                        </Button>
                    </form>
                </Box>
            </Box>
        </>
    )
}

export default Login


