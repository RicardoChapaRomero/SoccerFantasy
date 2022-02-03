import { useState } from 'react';
import '../start/Form.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import Email from '@mui/icons-material/Email';
import Groups from '@mui/icons-material/Groups';
import { validateEmail } from '../../utils';
import { formRegister } from '../../scripts/apiScripts';

function RegisterForm(props) {
  const { email, password, name, teamName, onChange } =
    props;
  const [values, setValues] = useState({
    email: email,
    password: password,
    name: name,
    teamName: teamName,
    showPassword: false
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    name: '',
    teamName: ''
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

  const handleRegister = async () => {
    const res = await formRegister(
      values.email,
      values.password,
      values.name,
      values.teamName
    );
    if (res.alreadyRegistered) {
      alert('User already exists');
    } else {
      onChange();
    }
  };

  return (
    <div className="form">
      <div className="login">
        <Stack
          direction="column"
          spacing={{ xl: 5, xs: 3 }}
          justifyContent="center"
          alignItems="center"
          mt={{ xl: 6, xs: 4 }}
        >
          <h2> registration </h2>

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
                  <Email />
                </InputAdornment>
              )
            }}
          />

          <TextField
            id="outlined-name-input"
            errorText={null}
            label="Name"
            onChange={handleChange('name')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />
          <TextField
            id="outlined-email-input"
            label="Team Name"
            errorText={null}
            onChange={handleChange('teamName')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Groups />
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
          <Button onClick={handleRegister} variant="contained">
            Register
          </Button>
        </Stack>
      </div>
      <div className="footer">
        <span> Already have an account? </span>
        <span onClick={onChange} className="a">
          Click here
        </span>
      </div>
    </div>
  );
}
RegisterForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  name: PropTypes.string,
  teamName: PropTypes.string,
  onChange: PropTypes.func,
  onAuthChange: PropTypes.func
};
RegisterForm.defaultProps = {
  email: '',
  password: '',
  name: '',
  teamName: '',
  onChange: () => console.log('onchange')
};
export default RegisterForm;
