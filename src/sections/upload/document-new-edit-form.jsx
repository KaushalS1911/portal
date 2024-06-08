import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { countries } from 'src/assets/data';

import Label from 'src/components/label';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function DocumentNewEditForm({ currentUser }) {

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  // const NewUserSchema = Yup.object().shape({
  //   name: Yup.string().required('Name is required'),
  //   email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  //   phoneNumber: Yup.string().required('Phone number is required'),
  //   address: Yup.string().required('Address is required'),
  //   country: Yup.string().required('Country is required'),
  //   company: Yup.string().required('Company is required'),
  //   state: Yup.string().required('State is required'),
  //   city: Yup.string().required('City is required'),
  //   role: Yup.string().required('Role is required'),
  //   zipCode: Yup.string().required('Zip code is required'),
  //   avatarUrl: Yup.mixed().nullable().required('Avatar is required'),
   
  //   status: Yup.string(),
  //   isVerified: Yup.boolean(),
  // });

  const defaultValues = useMemo(
    () => ({
      // name: currentUser?.name || '',
      // city: currentUser?.city || '',
      // role: currentUser?.role || '',
      // email: currentUser?.email || '',
      // state: currentUser?.state || '',
      // status: currentUser?.status || '',
      // address: currentUser?.address || '',
      // country: currentUser?.country || '',
      // zipCode: currentUser?.zipCode || '',
      // company: currentUser?.company || '',
      // avatarUrl: currentUser?.avatarUrl || null,
      // phoneNumber: currentUser?.phoneNumber || '',
      // isVerified: currentUser?.isVerified || true,
      address: '',
      commodity: '',
      contact_person: '',
      district: '',
      gst_number: '',
      milling_type: '',
      name: '',
      pan_number: '',
      phone_number: '',
      pincode: '',
      quantity: '',
      state: '',
    }),
    [currentUser]
  );

  const methods = useForm({
    // resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const miilingType = ["Dry","Wet","Both"]
  const commodity = ["Rice","Wheat","Oats"]

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    // const payload = {
    //   ...data,
    //   // vendor_category,
    //   mode: 'test',
    // };
    // axios
    //   .post(
    //     'http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/channel_sales_partner',
    //     payload
    //   )
    //   .then((res) => {
    //     alert('Registered Successfully...');
    //     console.log('Registered Successfully...');
    //   })
    //   .catch((err) => console.log(err));
    console.log(data)
    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   reset();
    //   enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
    //   router.push(paths.dashboard.user.list);
    //   console.info('DATA', data);
    // } catch (error) {
    //   console.error(error);
    // }

  });

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (file) {
  //       setValue('avatarUrl', newFile, { shouldValidate: true });
  //     }
  //   },
  //   [setValue]
  // );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container>
        <Grid xs={12} item>
          <Card sx={{ p: 3 }}>
            <Box sx={{ mb: '30px', mt: '10px', color: '#00A76F', fontSize: '18px' }}>
              Basic Information
            </Box>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Full Name" />
              <RHFAutocomplete
                name="milling_type"
                type="milling_type"
                label="Milling Type"
                placeholder="Choose Milling Type"
                fullWidth
                options={miilingType.map((option) => option)}
                getOptionLabel={(option) => option}
              />
              <RHFAutocomplete
                name="commodity"
                type="commodity"
                label="Commodity"
                placeholder="Choose Commodity"
                fullWidth
                options={commodity.map((option) => option)}
                getOptionLabel={(option) => option}
              />
              <RHFTextField name="quantity" label="Quantity" />
              <RHFTextField name="contact_person" label="Contact Person" />
              <RHFTextField name="phone_number" label="Phone Number" />
              <RHFTextField name="pan_number" label="Pan Number" />
              <RHFTextField name="gst_number" label="GST Number" />
            </Box>
            <Box sx={{ my: '30px', color: '#00A76F', fontSize: '18px' }}>
              Address of Proposed Rice Mill Premises
            </Box>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              }}
            >
              <Box gridColumn={{ xs: 'span 1', sm: 'span 2', md: 'span 3' }}>
                <RHFTextField name="address" label="Address" fullWidth />
              </Box>

              <RHFAutocomplete
                name="district"
                type="district"
                label="District"
                placeholder="Choose District"
                fullWidth
                options={commodity.map((option) => option)}
                getOptionLabel={(option) => option}
              />
              <RHFAutocomplete
                name="state"
                type="state"
                label="State"
                placeholder="Choose Your State"
                fullWidth
                options={commodity.map((option) => option)}
                getOptionLabel={(option) => option}
              />
              <RHFTextField name="pincode" label="Pin Code" fullWidth />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" className='button' loading={isSubmitting}>
                {!currentUser ? 'Save' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

DocumentNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
