import { useState } from 'react';
import '../start/Form.css';
import Logo from '../Logo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import { validateEmail } from '../../utils';
import { GoogleLogin } from 'react-google-login';
import {
  googleAuthOnSuccess,
  googleAuthOnFailure,
  loginAuth
} from '../../scripts/apiScripts';

function LoginForm(props) {
  const { email, password, onChange } = props;
  const [values, setValues] = useState({
    email: email,
    password: password,
    showPassword: false
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    if (prop === 'email') {
      setErrors({
        ...errors,
        ['email']:
          event.target.value !== '' &&
          validateEmail(event.target.value)
            ? ''
            : 'Invalid email'
      });
    }
  };

  const handleLogin = () => {
    loginAuth(values.email, values.password);
  };

  return (
    <div className="form">
      <div className="login">
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            height: '25%'
          }}
        >
          <Logo> </Logo>
        </Stack>
        <Stack
          direction="column"
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{
            height: '50%'
          }}
        >
          <TextField
            error={errors.email !== ''}
            id="outlined-email-input"
            label="Email"
            errorText={
              validateEmail(values.email) ? 'Invalid Email' : null
            }
            helperText={errors.email}
            onChange={handleChange('email')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />

          <TextField
            id="outlined-password-input"
            errorText={null}
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={handleChange('password')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              )
            }}
          />
        </Stack>

        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            height: '20%'
          }}
        >
          <Button onClick={handleLogin} variant="contained">
            login
          </Button>

          <GoogleLogin
            clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={googleAuthOnSuccess}
            onFailure={googleAuthOnFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
          />
        </Stack>
      </div>
      <div className="footer">
        <span> New here? </span>
        <span onClick={onChange} className="a">
          Register now
        </span>
      </div>
    </div>
  );
}
LoginForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onChange: PropTypes.func
};
LoginForm.defaultProps = {
  email: '',
  password: '',
  onChange: () => console.log('onchange')
};
export default LoginForm;
