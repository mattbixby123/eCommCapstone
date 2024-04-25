
import { useState } from 'react';
import { useRegistrationFormMutation } from '../../api_calls/api';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/authslice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material'

export default function RegistrationForm() {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading: isUpdating, error, data}] = useRegistrationFormMutation();

  const validateInputs = (input) => {
    return input.trim().length > 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if(!validateInputs(email) || !validateInputs(password)) {
      alert("You must enter both email and password")
      return;
    }

    try {
      const response = await register({ email, password, firstName, lastName }).unwrap();
   

      if(response.token) {
        dispatch(setToken(response.token));
      }

      setEmail('');
      setUsername('');
      setPassword('');
      setFirstName('')
      setLastName('')
      setAddressLine1('');
      setAddressLine2('');
      setCity('');
      setState('');
      setPostalCode('');
      setCountry('')
      navigate('/customer')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' component='h1' gutterBottom>
        Register
      </Typography>
        <Box
          component='form'
          onSubmit = {handleSubmit}
          noValidate
          sm={{ mt: 1 }}
        >
        <TextField
          margin='normal'
          required
          fullWidth
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          label='Username'
          name='username'
          autoComplete='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField 
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="firstname"
          label="First Name"
          autoComplete="firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="lastname"
          label="Last Name"
          autoComplete="lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="addressLine1"
          label="Address Line 1"
          autoComplete="addressLine1"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="addressLine2"
          label="Address Line 2"
          autoComplete="addressLine2"
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="city"
          label="City"
          autoComplete="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="state"
          label="State"
          autoComplete="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="postalCode"
          label="Postal Code"
          autoComplete="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="country"
          label="Country"
          autoComplete="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          disabled={isUpdating}
        >
          {isUpdating ? 'Registering...' : 'Register'}
        </Button>
        {error && (
          <Typography color='error'>
            Registration Failed: {error.data?.message || "Please Try Again"}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2}}>
          <Button variant='outlined' onClick={() => navigate('/')}>Home</Button>
          <Button variant='outlined' onClick={() => navigate('/product')}>Products</Button>
        </Box>
      </Box>
    </Container>
  )
}