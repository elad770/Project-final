import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { update, resetSlice } from '../../../features/auth/authSlice';
// utils

import { fData } from '../../../utils/formatNumber';
// assets
import { countries } from '../../../assets/data';
// components
import FormProvider, { RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';

// ----------------------------------------------------------------------

Profile.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function Profile({ isEdit = false, currentUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth);
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role is required'),
    avatarUrl: Yup.string().required('Avatar is required').nullable(true),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      zipCode: currentUser?.zipCode || '',
      avatarUrl: currentUser?.avatarUrl || null,
      isVerified: currentUser?.isVerified || true,
      status: currentUser?.status,
      company: currentUser?.company || '',
      role: currentUser?.role || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    clearErrors,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentUser && isSuccess) {
      reset(defaultValues);
    } else if (isError) {
      setError('customError', { type: 'custom', message: `${message}` });
    }
    dispatch(resetSlice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, isError, isSuccess, message, setError, dispatch]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const name = 'avatarUrl';
      delete data[name];
      console.log(data);
      dispatch(update(data));
      reset();
      navigate('/dashboard'); // navigate to path that you want to be there after updated
      // console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });

        const dat = new FormData();
        dat.append('file', acceptedFiles[0]);
        console.log(acceptedFiles[0]);

        const data = new FormData();
        data.append('file', acceptedFiles[0]);
        fetch(`https://cleanly.onrender.com/users/uploadImage`, {
          method: 'post',
          headers: new Headers({
            Authorization: `Bearer ${user.access_token}`,
          }),
          body: data,
        });
      }
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ pt: 10, pb: 5, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                <RHFUploadAvatar
                  name="avatarUrl"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="name" label="Full Name" />
                <RHFTextField name="email" label="Email Address" />
                <RHFTextField name="phoneNumber" label="Phone Number" />

                <RHFSelect native name="country" label="Country" placeholder="Country">
                  <option value="" />
                  {countries.map((country) => (
                    <option key={country.code} value={country.label}>
                      {country.label}
                    </option>
                  ))}
                </RHFSelect>

                <RHFTextField name="state" label="State/Region" />
                <RHFTextField name="city" label="City" />
                <RHFTextField name="address" label="Address" />
                <RHFTextField name="zipCode" label="Zip/Code" />
                <RHFTextField name="company" label="Company" />
                <RHFTextField name="role" label="Role" />
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  onClick={() => clearErrors('customError')}
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {!isEdit ? 'Create User' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
