import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useSelector, useDispatch } from 'react-redux';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { register_, resetSlice } from '../../../features/auth/authSlice';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const onSubmit = (userData) => {
    dispatch(register_(userData));
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isError) {
      setError('customError', { type: 'custom', message: `${message}` });
    } else if (isSuccess) {
      navigate('/dashboard', { replace: true });
    }

    dispatch(resetSlice());
  }, [user, isError, isSuccess, message, navigate, dispatch, setError]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ my: 2 }}>
          <ErrorMessage
            errors={errors}
            name="customError"
            render={({ message }) => (
              <Alert variant="outlined" severity="error">
                <strong>{message}</strong>
              </Alert>
            )}
          />
          <TextField
            name="firstName"
            label="First Name"
            {...register('firstName', {
              required: 'First Name is required',
              pattern: {
                value: /^[a-zA-Zא-ת\s]+$/i,
                message: 'Invalid First Name',
              },
            })}
            error={!!errors?.firstName}
            helperText={errors?.firstName ? errors.firstName.message : null}
          />

          <TextField
            name="lastName"
            label="Last Name"
            {...register('lastName', {
              required: 'Last Name required',
              pattern: {
                value: /^[a-zA-Zא-ת\s]+$/,
                message: 'Invalid Last Name',
              },
            })}
            error={!!errors?.lastName}
            helperText={errors?.lastName ? errors.lastName.message : null}
          />

          <TextField
            name="email"
            label="Email address"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={!!errors?.email}
            helperText={errors?.email ? errors.email.message : null}
          />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register('password', {
              required: 'Password is required',
            })}
            error={!!errors?.password}
            helperText={errors?.password ? errors.password.message : null}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
          onClick={() => clearErrors('customError')}
        >
          Create Account
        </LoadingButton>
      </form>
    </>
  );
}
