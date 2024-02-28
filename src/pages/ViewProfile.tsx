import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  Typography,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import { useEffect, useState } from 'react';
import PersonalInfoForm from '../components/profile/PersonalInfoForm';
import ManageAddressForm from '../components/profile/ManageAddressForm';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { getUserById, updateUser } from '../slices/userSlice';

const ViewProfile = () => {
  const getUserDetails: any = useAppSelector((store) => store.user);
  const { response } = getUserDetails;

  const [showForm, setShowForm] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedForm, setSelectedForm] = useState<React.ReactNode>(<></>);
  const [loggedinUser, setLoggedinUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(getUserById(parsedUser.id));
    }
  }, []);

  useEffect(() => {
    if (response.status == 200) {
      setLoggedinUser(response.data);
      setSelectedForm(
        <PersonalInfoForm
          user={response.data}
          handleUpdate={handlePersonalInfo}
        />
      );
    }
  }, [response]);

  const handlePersonalInfo = (form: any) => {
    console.log(form);
    dispatch(updateUser(form));
    handleClick();
    setLoggedinUser(form);
  };

  const switchForm = (index: number) => {
    switch (index) {
      case 0:
        setSelectedForm(
          <PersonalInfoForm
            user={loggedinUser}
            handleUpdate={handlePersonalInfo}
          />
        );
        break;
      case 1:
        setSelectedForm(<ManageAddressForm />);
        break;
      case 2:
        break;
      case 3:
        break;

      default:
        break;
    }
  };

  const handleListItemClick = (index: number) => {
    setShowForm(true);
    setActiveIndex(index);
    switchForm(index);
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}
        >
          Your Personal Information Updated Successfully.
        </Alert>
      </Snackbar>
      <Grid container spacing={1} sx={{ padding: 2 }}>
        <Grid item lg={3} md={3} sm={6} xs={12}>
          <Card sx={{ marginBottom: 2 }}>
            <CardMedia
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: 1,
                position: 'relative',
                height: '120px',
                width: '120px',
                margin: '0 auto',
              }}
            >
              <img
                src='/images/suraj.jpeg'
                style={{
                  objectFit: 'cover',
                  borderRadius: '50%',
                  height: '100%',
                  width: '100%',
                }}
              />
              <EditIcon sx={{ position: 'absolute', bottom: 0, right: 0 }} />
            </CardMedia>
            <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
              {' '}
              <Typography variant='h5'>Hello Suraj</Typography>
            </CardContent>
          </Card>

          {/* Second Card */}
          <Card>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            >
              <ListItem
                button
                sx={{ bgcolor: activeIndex === 0 ? 'grey' : 'inherit' }}
                onClick={() => handleListItemClick(0)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary='Personal Information'
                  secondary='Jan 9, 2014'
                />
              </ListItem>
              <ListItem
                button
                sx={{ bgcolor: activeIndex === 1 ? 'grey' : 'inherit' }}
                onClick={() => handleListItemClick(1)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <HomeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary='Manage Address'
                  secondary='Jan 7, 2014'
                />
              </ListItem>
              <ListItem
                button
                sx={{ bgcolor: activeIndex === 2 ? 'grey' : 'inherit' }}
                onClick={() => handleListItemClick(2)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <ShoppingBagIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Orders' secondary='July 20, 2014' />
              </ListItem>
              <ListItem
                button
                sx={{ bgcolor: activeIndex === 3 ? 'grey' : 'inherit' }}
                onClick={() => handleListItemClick(3)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <FavoriteIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='My Wishlist' secondary='July 20, 2014' />
              </ListItem>
            </List>
          </Card>
        </Grid>

        <Grid item lg={9} md={9} sm={6} xs={12}>
          <Card sx={{ height: '100%' }}>{selectedForm}</Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ViewProfile;
