import * as React from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box, Button, SelectChangeEvent } from '@mui/material';
import CustomModal from '../modal/CustomModal';
import CustomInput from '../FormComponents/CustomInput';
import CustomSelect from '../FormComponents/CustomSelect';
import { useAppDispatch } from '../../state/hooks';
import { getUserList, updateUser } from '../../slices/userSlice';

type propsType  = {
    selectedUser : {
        id : number,
        firstName : string,
        lastName : string,
        email : string,
        status : boolean,
        role : string
    },
}

export default function UserForm({selectedUser} : propsType) {
    const { id ,firstName,lastName, email , role ,status } = selectedUser;
    const [form, setForm] = React.useState({
        id : id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        status : status
    });

    const dispatch = useAppDispatch();

    const [openModal, setOpenModal] = React.useState(false);

    const handleOpenModal = () => {
      setOpenModal(true);
    };
  
    const handleCloseModal = () => {
      setOpenModal(false);
    };


      const roleList = [
        { 
            key :'admin',
            value : 'Admin'
        },
        { 
            key :'user',
            value : 'User'
        }];
      const statusList = [
        { 
            key :true,
            value : 'Active'
        },
        { 
            key :false,
            value : 'Inactive'
        }];

        const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
            setForm((prev) => ({
                ...prev,
                [e.target.name] : e.target.value
            }))
        }

        const handleSelectChange = (e: SelectChangeEvent) => {
            setForm((prev) => ({
                ...prev,
                [e.target.name] : e.target.value
            }))
        };

        const handleUpdate = async(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            console.log(form);
            await dispatch(updateUser(form));
            dispatch(getUserList());
            handleCloseModal();
        }

  return (
    <Box>
        <Button
        onClick={handleOpenModal}
        variant='outlined'
        startIcon={<BorderColorIcon/>}
        sx={{ fontSize: '0.8rem' }}
        >
        Edit
        </Button>

      <CustomModal
        open={openModal}
        onClose={handleCloseModal}
        title="Edit User"
        // actions={modalActions}
      >
        <Box padding={3}>
            <form onSubmit={handleUpdate}>
                <Box>
                    <CustomInput label='First Name' name='firstName' id='firstName' value={form.firstName} handleChangeEvent={handleChange}/>
                    <CustomInput label='Last Name' name='lastName' id='lastName' value={form.lastName} handleChangeEvent={handleChange}/>
                    <CustomInput label='Email' name='email' id='email' value={form.email} handleChangeEvent={handleChange}/>
                    <CustomSelect label='Role' id='role' name='role' list={roleList} selectedValue={form.role} handleSelectChangeEvent={handleSelectChange}/>
                    <CustomSelect label='Status' id='status' name='status' list={statusList} selectedValue={form.status} handleSelectChangeEvent={handleSelectChange}/>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'} mt={3} >
                    <Button onClick={handleCloseModal} color="primary">
                        Cancel
                    </Button>
                    <Button type='submit' color="primary" variant='contained'>
                        Confirm
                    </Button>
                </Box>
            </form>
        </Box>
      </CustomModal>
    </Box>
  );
}





