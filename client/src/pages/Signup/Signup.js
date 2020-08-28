import React, { useState, useEffect } from 'react';
import AuthService from '../../services/auth-service'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://ante-portfolio.netlify.app/">
        Ante Cuic 
      </Link>{ ' ' }
      { new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SignUp = props => {

  const [ email, setEmail ] = useState('');
  const [ name, setName] = useState('');
  const [ surname, setSurname ] = useState('');
  const [ password, setPassword ] = useState('');
  const [currency, setCurrency] = useState('HRK');

  useEffect(() => {
    if(localStorage.getItem('user')) {
      props.history.push('/')
    }
  })

  const classes = useStyles();

  const signuphandler = e => {
    e.preventDefault()
    AuthService.register(`${name} ${surname}`, email, password, currency).then(() => AuthService.login(email, password)).then(() => props.history.push('/'))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={e => signuphandler(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                onChange={e => setName(e.target.value)}
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                onChange={e => setSurname(e.target.value)}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={e => setEmail(e.target.value)}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setPassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="currency-native-label-placeholder">
                Currency
              </InputLabel>
              <NativeSelect
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                inputProps={{
                  name: 'currency',
                  id: 'age-native-label-placeholder',
                }}
              >
                <option value={'HRK'}>HRK</option>
                <option value={'BAM'}>BAM</option>
                <option value={'EUR'}>EUR</option>
                <option value={'USD'}>USD</option>
              </NativeSelect>
            </FormControl>
            </Grid>
          </Grid>
          <Button
          type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUp