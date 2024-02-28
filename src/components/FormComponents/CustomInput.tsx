import { Box, FormControl, InputLabel, OutlinedInput, TextField, useMediaQuery, useTheme } from '@mui/material';

type Props = {
  label: string;
  name: string;
  id: string;
  value: any;
  handleChangeEvent : (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CustomInput({ label, name, id, value, handleChangeEvent }: Props) {
  const theme = useTheme();
  const medScreen = useMediaQuery(theme.breakpoints.down('md'));
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box mt={2}>
      <FormControl sx={{ width : `${fullScreen ? '100%' : medScreen ? '300px' : '400px'}`}}>
          <TextField variant="outlined" label={label} name={name} id={id} value={value} onChange={handleChangeEvent}/>
      </FormControl>
    </Box>
  );
}
