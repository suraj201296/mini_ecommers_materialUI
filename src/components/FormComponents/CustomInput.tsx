import { Box, FormControl, InputLabel, OutlinedInput, useMediaQuery, useTheme } from '@mui/material';

type Props = {
  label: string;
  name: string;
  id: string;
  value: any;
  handleChangeEvent : (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CustomInput({ label, name, id, value, handleChangeEvent }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box mt={2}>
      <FormControl sx={{ width : `${fullScreen ? '100%' : '400px'}`}}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <OutlinedInput name={name} id={id} value={value} label='Name' onChange={handleChangeEvent}/>
      </FormControl>
    </Box>
  );
}
