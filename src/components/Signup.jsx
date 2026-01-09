import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { showError, showSuccess } from '../utils/toast'
import axios from 'axios'

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" })
    const navigate = useNavigate()

    const submitHandler = async (data) => {
        try {
            const res = await axios.post("https://jobtrackerbackend-6gxo.onrender.com/signup", data);
            showSuccess("Registeration Successful");
            setTimeout(() => {
                navigate("/login")
            }, 3000)
        } catch (err) {
            showError(err.response?.data?.message || "SignUp Failed")
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
                    <Typography variant='h5' mb={3}>Sign Up</Typography>
                    <form onSubmit={handleSubmit(submitHandler)} noValidate style={{ width: '100%' }}>
                        <TextField 
                            fullWidth
                            label="Name"
                            margin='normal'
                            {...register("name",{required:"Name is Required"})}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
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
                            SignUp
                        </Button>
                    </form>
                </Box>
            </Box>
        </>
    )
}

export default Signup