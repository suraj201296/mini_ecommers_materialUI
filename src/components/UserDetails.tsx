import { Box, Typography , Card, CardMedia, Button, Grid} from '@mui/material'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

type Props = {
    user : {
        id : number,
        name : string,
        status : boolean,
        role : string
    }
}

export default function UserDetails({user}: Props) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ boxSizing: 'border-box', padding: '10px', margin: '8px', boxShadow: '0px 0px 5px 0px grey' }}>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} sx={{ background : '#fcd4f2'}}>
          <Typography ml={'auto'} display={'flex'} justifyContent={'center'} padding={1} ><FiberManualRecordIcon sx={{ color : `${user.status ? 'green' : 'red'}`}}/>{user.status ? 'Online' : 'Offline'}</Typography>
          <PersonIcon sx={{ height: '150px', width:'150px'}} />
        </Box>
        <Box display={'flex'} justifyContent={'center'} marginTop ={'-17px'}>
          <Button
              startIcon={user.role === "admin" ? <AdminPanelSettingsIcon /> : <PersonIcon />}
              variant='outlined'
              sx={{
                backgroundColor: `${user.role === "admin" ? '#220887' : 'green'}`,
                borderColor: 'green',
                color: 'white',
                fontSize: '0.8rem',
                borderRadius : '50px',
                ':hover': { backgroundColor: `${user.role === "admin" ? '#220887' : 'green'}`, cursor:'auto' }
              }}
            >
              {user.role}
          </Button>
        </Box>
        <Box display="flex" alignItems="center" justifyContent={'center'} mt={2}>
            <Typography variant='h6' sx={{ fontWeight: '600', textTransform: 'capitalize', mb: 1 }}>
              {user.name}
            </Typography>
        </Box>
        <Box display='flex' justifyContent='space-between' mt={2}>
          <Button variant='outlined' startIcon={<BorderColorIcon />} sx={{ fontSize: '0.8rem' }}>Edit</Button>
          <Button variant='contained' startIcon={<DeleteIcon />} sx={{ fontSize: '0.8rem', ml: 1 }}>Delete</Button>
        </Box>
      </Card>
    </Grid>
  )
}