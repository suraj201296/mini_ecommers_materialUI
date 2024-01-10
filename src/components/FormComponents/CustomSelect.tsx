import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react'

type Props = {
    label : string,
    id : string,
    name : string ,
    list : any,
    selectedValue : any,
    handleSelectChangeEvent : ( e : SelectChangeEvent) => void
}

export default function CustomSelect({label, id, name , list , selectedValue, handleSelectChangeEvent}: Props) {
    
    return (
      <Box  mt={2} sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id={id}>{label}</InputLabel>
          <Select
            labelId={id}
            id={id}
            name={name}
            value={selectedValue}
            label={label}
            onChange={handleSelectChangeEvent}
          >
            { 
                list.map((item : any , index : number) => (
                    <MenuItem key={index} value={item.key}>{item.value}</MenuItem>
                )) 
            }
          </Select>
        </FormControl>
      </Box>
    );
}