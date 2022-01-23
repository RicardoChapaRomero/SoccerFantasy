import { useState } from 'react';
import './LoginPage.css';
import Messi from './Messi';
import Logo from '../Logo';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import colors from '../../colors';

const ColorButton = styled(Button)(() => ({
  color: colors.darkGray,
  backgroundColor: colors.yellow,
  width: '100px',
  '&:hover': {
    backgroundColor: colors.hoverYellow
  }
}));

function LoginPage() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="LoginPage">
      <Messi></Messi>
      <div className="form">
        <div className="login">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              margin: '10% 0 5% 0'
            }}
          >
            <Logo> </Logo>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              margin: '10% 0 5% 0'
            }}
          >
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                E-mail
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                value={values.email}
                onChange={handleChange('email')}
                label="E-mail"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              margin: '10% 0 5% 0'
            }}
          >
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              margin: '10% 0 5% 0'
            }}
          >
            <ColorButton
              onClick={() => console.log('click!')}
              variant="contained"
            >
              login
            </ColorButton>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
