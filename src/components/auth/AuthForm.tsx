import { Box, TextField, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { loginUser, registerUser } from '../../slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { useNavigate } from 'react-router-dom';

type FormType = {
  firstName: string | null;
  email: string;
  password: string;
};
type functionType = () => void;
type propsType = {
  onLogin : functionType
}

export default function AuthForm({onLogin} : propsType) {
  let disaptch = useAppDispatch();
  let userLoginState = useAppSelector((store) => store.user);

  const { response, error }: any = userLoginState;
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState<FormType>({
    firstName: '',
    email: '',
    password: '',
  });
  const [errMsg, setErrMsg] = useState<string>();
  const [successMsg, setSuccessMsg] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isSignup ? disaptch(registerUser(form)) : disaptch(loginUser(form)) ;
    console.log(form);
  };

  const handleIsSignupBtn =()=> {
    setIsSignup(!isSignup);
    setForm({
      firstName: '',
      email: '',
      password: '',
    });
  }

  useEffect(() => {
    if (response && response.statusCode == 200) {
      if(isSignup) {
        setSuccessMsg(response.message+ " Please Login.");
        setIsSignup(false);
      } else {
        let token = response.data.token;
        if (token) {
          localStorage.setItem('token', token);
          sessionStorage.setItem('user', JSON.stringify(response.data.user));
          onLogin();
          setForm({
            firstName: '',
            email: '',
            password: '',
          });
          navigate('/');
        } else {
          setErrMsg(response.message);
        }
      }
      
    } else if(response && response.error) { 
      setErrMsg(response.message);
    } else if(error) {
      setErrMsg(error);
    }
  }, [response]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          maxWidth={400}
          alignItems={'center'}
          justifyContent={'center'}
          margin={'auto'}
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={'5px 5px 10px #ccc'}
          sx={{
            ':hover': {
              boxShadow: '10px 10px 20px #ccc',
            },
          }}
        >
          <Typography variant='h2' padding={3} textAlign={'center'}>
            {isSignup ? 'Register' : 'Login'}
          </Typography>
          {successMsg && <Typography variant="body1" component="span" sx={{ color : 'green' , backgroundColor : '#d5f7e7' , borderRadius: '3px', padding: '10px', width : '50%', display: 'flex',justifyContent: 'center'}}>{successMsg}</Typography>}
          {errMsg && <Typography variant="body1" component="span" sx={{ color : 'red' , backgroundColor : '#f5d0ce' , borderRadius: '3px', padding: '10px', width : '50%', display: 'flex',justifyContent: 'center'}}>{errMsg}</Typography>}
          {isSignup && (
            <TextField
              name='firstName'
              value={form.firstName}
              onChange={handleChange}
              margin='normal'
              type={'text'}
              variant='outlined'
              placeholder='Name'
            ></TextField>
          )}
          <TextField
            name='email'
            value={form.email}
            onChange={handleChange}
            margin='normal'
            type={'email'}
            variant='outlined'
            placeholder='Email'
          ></TextField>
          <TextField
            name='password'
            value={form.password}
            onChange={handleChange}
            margin='normal'
            type={'password'}
            variant='outlined'
            placeholder='Password'
          ></TextField>
          <Button
            endIcon={isSignup ? <HowToRegIcon /> : <LoginIcon />}
            sx={{ marginTop: 3, borderRadius: 2 }}
            variant='contained'
            color='warning'
            type='submit'
          >
            {isSignup ? 'Register' : 'Login'}{' '}
          </Button>
          <Button
            sx={{ marginTop: 3, borderRadius: 2 }}
            onClick={handleIsSignupBtn}
          >
            {isSignup
              ? 'Already Register? Login here'
              : 'New Member? Register here'}{' '}
          </Button>
        </Box>
      </form>
    </div>
  );
}
