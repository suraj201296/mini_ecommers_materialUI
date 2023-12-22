import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { getUserList } from '../slices/userSlice';
import store from '../state/store';
import { Box, Button, Card, CardHeader, Grid, Typography } from '@mui/material';
import DataGridTools from '../components/DataGridTools';
import UserDetails from '../components/UserDetails';

type Props = {}

// const columns: GridColDef[] = [
//     { field: 'id', headerName: 'ID', width: 100 },
//     { field: 'name', headerName: 'Name', width: 250 },
//     {
//       field: 'role',
//       headerName: 'Role',
//       width: 150,
//     },
//     {
//       field: 'status',
//       headerName: 'Status',
//       sortable: false,
//       width: 200,
//     },
//   ];
  
  
//   export default function About({}: Props) {

//     const dispatch = useAppDispatch();
//     const userList : any = useAppSelector((store)=> store.user);
//     const { response } = userList;

//     const [rows , setRows] = useState([]);
//     const [loading, setLoading] = useState<boolean>(false);

//     useEffect(()=>{
//         setLoading(true);
//         dispatch(getUserList());
//     },[]);
    
//     useEffect(()=>{
//         if(response.length) {
//             setRows(response);
//         }
//         setLoading(false);
//     },[response]);

//     const slots : any = {
//         toolbar: DataGridTools,
//         baseButton: (props : any) => <Button {...props} variant="outlined" />,
//     };

//     return (
//             <Card sx={{ padding : '10px' , margin : '10px'}}>
//                 <CardHeader title='User List'></CardHeader>
//                 <DataGrid
//                     rows={rows}
//                     columns={columns}
//                     loading={loading} sx={{ height: 530 }}
//                     slots={slots}
//                     initialState={{
//                         pagination: {
//                             paginationModel: { page: 0, pageSize: 5 },
//                         },
//                     }}
//                     pageSizeOptions={[5, 10]}
//                 />
//             </Card>
//       );
// }



export default function About({}: Props) { 

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