import { Box, Typography , Card, CardMedia, Button, Grid} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import DeleteIcon from '@mui/icons-material/Delete';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import UserForm from './user/UserForm';
import { useAppDispatch } from '../state/hooks';
import { deleteUser, getUserList } from '../slices/userSlice';

type Props = {
    user : {
        id : number,
        name : string,
        email : string,
        status : boolean,
        role : string
    }
}

export default function UserDetails({user}: Props) {

  const dispatch = useAppDispatch();
  const handleDeleteUser = async(id : number) => {
    await dispatch(deleteUser(id));
    dispatch(getUserList());
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ boxSizing: 'border-box', padding: '10px', margin: '8px', boxShadow: '0px 0px 5px 0px lightgrey' }}>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} sx={{ background : 'antiquewhite', borderRadius : '5px'}}>
          <Typography ml={'auto'} display={'flex'} justifyContent={'center'} padding={1} ><FiberManualRecordIcon sx={{ color : `${user.status ? 'green' : 'red'}`}}/>{user.status ? 'Online' : 'Offline'}</Typography>
          {user.role === "admin" ? <img src='/images/suraj.jpeg' style={{ objectFit: 'cover', borderRadius: '50%', height: '150px', width:'150px' }}/> : <PersonIcon sx={{ height: '150px', width:'150px' , color: 'grey'}} /> }
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
        <Box display={'flex'} alignItems="center" justifyContent={'center'}  flexDirection={'column'} mt={2}>
            <Typography variant='h6' sx={{ fontWeight: '600', textTransform: 'capitalize', mb: 1 }}>
              {user.name}
            </Typography>
            <Typography sx={{ textTransform: 'capitalize', mb: 1 }}>
              {user.email}
            </Typography>
        </Box>
        <Box display='flex' justifyContent='space-between' mt={2}>
          <UserForm selectedUser={user}/>
          {user.role !== "admin" && <Button variant='contained' startIcon={<DeleteIcon />} sx={{ fontSize: '0.8rem', ml: 1 }} onClick={() => handleDeleteUser(user.id)}>Delete</Button>}
        </Box>
      </Card>
    </Grid>
  )
}