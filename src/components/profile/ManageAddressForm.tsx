import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import CustomInput from '../FormComponents/CustomInput'

type Props = {}

export default function ManageAddressForm({}: Props) {
  const [form, setForm] = React.useState({
    address: '',
    state: '',
    city : '',
    pincode: '',
});

const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  setForm((prev) => ({
      ...prev,
      [e.target.name] : e.target.value
  }))
}
  return (
    <form >
        <Box sx={{ paddingLeft : 2, paddingTop : 5}}>
            <Typography variant='h5'>Manage Address</Typography>
        </Box>
        <Grid container spacing={1} sx={{ padding: 2 }}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomInput label='Address' name='address' id='address' value={form.address} handleChangeEvent={handleChange}/>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomInput label='State' name='state' id='state' value={form.state} handleChangeEvent={handleChange}/>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomInput label='City' name='city' id='city' value={form.city} handleChangeEvent={handleChange}/>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomInput label='Pincode' name='pincode' id='pincode' value={form.pincode} handleChangeEvent={handleChange}/>
            </Grid>
            <Box sx={{ margin : '10px'}}>
                <Button variant='contained' type='submit'>Update</Button>
            </Box>
        </Grid>
    </form>
  )
}