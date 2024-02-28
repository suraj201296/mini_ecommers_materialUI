import React from 'react'
import CustomInput from '../FormComponents/CustomInput'
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

type propsType  = {
    user : {
        id : string
        firstName : string,
        lastName : string,
        email : string,
        mobileNo : string
    },
    handleUpdate : (user : any) => void;
}
export default function PersonalInfoForm({user, handleUpdate}: propsType) {
    const { id, firstName,lastName, email , mobileNo } = user;
    const [form, setForm] = React.useState({
        id : id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo : mobileNo
    });

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const handlePersonalInfoSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(form);
        handleUpdate(form);
        
    }

  return (
    <form onSubmit={handlePersonalInfoSubmit}>
        <Box sx={{ paddingLeft : 2, paddingTop : 5}}>
            <Typography variant='h5'>Personal Information</Typography>
        </Box>
        <Grid container spacing={1} sx={{ padding: 2 }}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomInput label='First Name' name='firstName' id='firstName' value={form.firstName} handleChangeEvent={handleChange}/>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomInput label='Last Name' name='lastName' id='lastName' value={form.lastName} handleChangeEvent={handleChange}/>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomInput label='Mobile Number' name='mobileNo' id='mobileNo' value={form.mobileNo} handleChangeEvent={handleChange}/>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomInput label='Email' name='email' id='email' value={form.email} handleChangeEvent={handleChange}/>
            </Grid>
            <Box sx={{ margin : '10px'}}>
                <Button variant='contained' type='submit'>Update</Button>
            </Box>
        </Grid>
    </form>
  )
}