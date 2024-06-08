import React from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { AUTH_API, PATH_AFTER_LOGIN } from '../../../config-global';
import { useRouter } from '../../../routes/hooks';
import { paths } from '../../../routes/paths';
import FormProvider from 'src/components/hook-form/form-provider';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { RHFTextField , RHFAutocomplete} from 'src/components/hook-form';
const RegistrationForm = ({ vendor_category }) => {
  const router = useRouter();
  const millingTypeOptions = ["Dry", "Wet", "Both"];
  const districtOptions = ["Amreli","Bhavanagar"];
  const stateOptions = ["Surat","Ahemdabad"];
  const NewBlogSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    contact_person: Yup.string().required('Contact is required'),
    confirm_paasword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    district: Yup.string().required('District is required'),
    gst_number: Yup.string().required('GST Number is required'),
    milling_type: Yup.string().required('Milling Type is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    state: Yup.string().required('State is required'),
    pan_number: Yup.string().required('Pan Number is required'),
    pincode: Yup.string().required('Pincode is required'),
    phone_number: Yup.string().max(10).required('Phone Number is required'),
  });
  const defaultValues = {
    address: '',
    confirm_password: '',
    contact_person: '',
    district: '',
    gst_number: '',
    milling_type: '',
    name: '',
    email: '',
    pan_number: '',
    phone_number: '',
    pincode: '',
    password: '',
    state: '',
  }
  const methods  = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues
  });
  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = handleSubmit(async (values) => {
    let payload;
    vendor_category === 'Distributor'
      ? (payload = {
        address: values.address,
        password: values.password,
        confirm_password: values.confirm_password,
        contact_person: values.contact_person,
        district: values.district,
        email: values.email,
        gst_number: values.gst_number,
        name: values.name,
        pan_number: values.pan_number,
        phone_number: values.phone_number,
        pincode: values.pincode,
        state: values.state,
        vendor_category,
        mode: 'test',
      })
      : (payload = {
        ...values,
        vendor_category,
        mode: 'test',
      });
    axios
      .post(
        `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/channel_sales_partner`,
        payload
      )
      .then((res) => {
        router.push(paths.auth.jwt.login)
      })
      .catch((err) => console.log(err));
  });
  return (
    <Box p={5} className="registerForm" sx={{ backgroundColor: 'white', borderRadius: "10px" }}>
      <Typography variant="h5" gutterBottom className="heading">
        Basic Information
      </Typography>
      <FormProvider onSubmit={onSubmit} methods={methods}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <RHFTextField name="name" label="Name" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <RHFTextField name="email" label="Email" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <RHFTextField type={"password"} name={"password"} label={"Password"}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <RHFTextField type={"password"} name={"confirm_password"} label={"Conform Password"}/>
          </Grid>
          {vendor_category !== 'Distributor' && (
            <Grid item xs={12} sm={6} md={3}>
              <RHFAutocomplete
                name="milling_type"
                type="milling_type"
                label="Milling Type"
                placeholder="Choose Milling Type"
                fullWidth
                options={millingTypeOptions.map((option) => option)}
                getOptionLabel={(option) => option}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6} md={3}>
            <RHFTextField name="contact_person" label="Contact Person" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <RHFTextField name="phone_number" label="Phone Number" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <RHFTextField name="pan_number" label="Pan Number" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <RHFTextField name="gst_number" label="GST Number" />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom className="heading" mt={2}>
          Address of Proposed Rice Mill Premises
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RHFTextField name="address" label="Address" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <RHFAutocomplete
              name="district"
              label="District"
              placeholder="Choose Your District"
              fullWidth
              options={districtOptions.map((option) => option)}
              getOptionLabel={(option) => option}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <RHFAutocomplete
              name="state"
              type="state"
              label="State"
              placeholder="Choose Your State"
              fullWidth
              options={stateOptions.map((option) => option)}
              getOptionLabel={(option) => option}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <RHFTextField name="pincode" label="Pin Code" />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button type="submit" variant="contained" color="primary">
            SUBMIT
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};
export default RegistrationForm;
