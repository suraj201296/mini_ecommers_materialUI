import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { getUserList } from '../slices/userSlice';
import UserDetails from '../components/UserDetails';
import { Grid } from '@mui/material';

type Props = {}

export default function Users({}: Props) { 

    const dispatch = useAppDispatch();
    const userList : any = useAppSelector((store)=> store.user);
    const { response } = userList;

    const [rows , setRows] = useState([]);

    useEffect(() => {
      dispatch(getUserList());
    }, []);

    useEffect(() => {
      if (response.length) {
        setRows(response);
      }
    }, [response]);

    return(
      <Grid container spacing={3} padding={3}>
        {rows.map((user, index) => (
          <UserDetails key={index} user={user} />
        ))}
      </Grid>
    )
}