// import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';

// redux and google
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { userLoginGoogle } from '../features/auth/authSlice';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { RegisterForm } from '../sections/auth/register';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
  const clinetId = '1025813930546-ags5s4jolsbetbg6al74c4vh20v8bo3n.apps.googleusercontent.com';

  const onSuccess = (res) => {
    dispatch(userLoginGoogle(res.profileObj))
      .unwrap()
      .then((originalPromiseResult) => {
        navigate('/dashboard/profile', { replace: true });
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError);
      });
  };
  const onFailure = (res) => {
    console.log('login FAILURE', res);
  };

  return (
    <>
      <Helmet>
        <title> Register | Cleany </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign up to Cleany
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              Already have an account? {''}
              <Link href="/login" variant="subtitle2">
                Sign in
              </Link>
            </Typography>

            <RegisterForm />

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <Stack direction="row" spacing={2}>
              <GoogleLogin
                clientId={clinetId}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={0}
                render={(renderProps) => (
                  <Button onClick={renderProps.onClick} fullWidth size="large" color="inherit" variant="outlined">
                    <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
                  </Button>
                )}
              />
            </Stack>
            {/* <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button> */}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
