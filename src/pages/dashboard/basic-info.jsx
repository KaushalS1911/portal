import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../auth/hooks';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import FormProvider from 'src/components/hook-form/form-provider';
import RHFAutocomplete from 'src/components/hook-form/rhf-autocomplete';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import { useSettingsContext } from 'src/components/settings/context';
import { Helmet } from 'react-helmet-async';
import { RHFTextField } from 'src/components/hook-form';

export default function BasicInfo() {
  const settings = useSettingsContext();
  const { vendor } = useAuthContext();
  const [currentUser, setCurrentUser] = useState({});
  const [commodities, setCommodities] = useState([]);

  const notify = () => toast.success('User details updated successfully');
  const notifyError = () => toast.error('Something went wrong');
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    fetchUser();
    fetchCommodities();
  }, [vendor]);


  function fetchUser() {
    if (vendor.phone_number) {
      axios
        .get(
          `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080//nccf/csp_detail/${vendor.phone_number}`,
        )
        .then((res) => {
          setCurrentUser(res?.data?.data[0]);
        })
        .catch((error) => console.log(error));
    }
  }

  function fetchCommodities() {
    axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/commodity`).then((res) => {
      setCommodities(res.data?.data);
    });
  }

  const defaultValues = {
    address: '',
    commodity: '',
    contact_person: '',
    district: '',
    gst_number: '',
    milling_type: '',
    name: '',
    pan_number: '',
    phone_number: vendor.phone_number,
    pincode: '',
    quantity: '',
    state: '',
    village: '',
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentUser) {
      reset({
        address: currentUser.address || '',
        commodity: currentUser.commodity || '',
        contact_person: currentUser.contact_person || '',
        district: currentUser.district || '',
        gst_number: currentUser.gst_number || '',
        milling_type: currentUser.milling_type || '',
        name: currentUser.name || '',
        pan_number: currentUser.pan_number || '',
        phone_number: vendor.phone_number,
        pincode: currentUser.pincode || '',
        quantity: currentUser.quantity || '',
        state: currentUser.state || '',
        village: currentUser.village || '',
      });
    }
  }, [currentUser, reset, vendor]);

  const milingType = ['Dry', 'Wet', 'Both'];
  const states = ['Gujarat', 'Delhi', 'Punjab'];
  const districts = ['Amreli', 'Surendranagar', 'Dhrol'];
  const villages = ['Surat', 'Bharuch', 'Rohini'];

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      ...data,
      csp_code: vendor.csp_code,
      mode: 'test',
    };
    axios
      .put('http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/update_info', payload)
      .then((res) => {
        notify();
      })
      .catch((err) => {
        notifyError();

      });
  });

  return (
    <>
      <Helmet>
        <title> Dashboard | Basic Info</title>
      </Helmet>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography variant="h4"> Basic Information</Typography>
        <Box
          sx={{
            mt: 5,
            width: 1,
            height: 320,
            borderRadius: 2,
          }}
        >
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <ToastContainer/>
            <Grid container>
              <Grid item md={4}>
                <Box sx={{ ml: { md: '60px', xs: '0' }, mt: '60px' }}>
                  <Box
                    sx={{
                      mb: '30px',
                      mt: '10px',
                      fontWeight: '600',
                      fontSize: '18px',
                    }}
                  >
                    Basic Information
                    <Typography sx={{ fontSize: '13px', color: '#637381' }}>
                      Basic Information Input fields
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid md={8} xs={12} item>
                <Card sx={{ p: 3 }}>
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
                    <RHFTextField name="name" label="Full Name" disabled={disable}/>
                    <RHFAutocomplete
                      name="milling_type"
                      type="milling_type"
                      label="Milling Type"
                      placeholder="Choose Milling Type"
                      fullWidth
                      options={milingType.map((option) => option)}
                      getOptionLabel={(option) => option}
                      disabled={disable}
                    />
                    <RHFAutocomplete
                      disabled={disable}
                      name="commodity"
                      type="commodity"
                      label="Commodity"
                      placeholder="Choose Commodity"
                      fullWidth
                      options={commodities.map((option) => option?.commodity_name)}
                      getOptionLabel={(option) => option}
                    />
                    <RHFTextField name="quantity" label="Quantity" disabled={disable}/>
                    <RHFTextField name="contact_person" label="Contact Person" disabled={disable}/>
                    <RHFTextField name="phone_number" label="Phone Number" disabled={disable}/>
                    <RHFTextField name="pan_number" label="Pan Number" disabled={disable}/>
                    <RHFTextField name="gst_number" label="GST Number" disabled={disable}/>
                  </Box>
                </Card>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: '80px' }}>
              <Grid item md={4}>
                <Box sx={{ ml: { md: '60px', xs: '0' }, mt: '60px' }}>
                  <Box
                    sx={{
                      mb: '30px',
                      mt: '10px',
                      fontWeight: '600',
                      fontSize: '18px',
                    }}
                  >
                    Address of Proposed Rice Mill Premises
                    <Typography sx={{ fontSize: '13px', color: '#637381' }}>
                      Basic Information Input fields
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid md={8} xs={12} item>
                <Card sx={{ p: 3 }}>
                  <Box
                    rowGap={3}
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(4, 1fr)',
                    }}
                  >
                    <Box gridColumn={{ xs: 'span 1', sm: 'span 2', md: 'span 4' }}>
                      <RHFTextField name="address" label="Address" fullWidth disabled={disable}/>
                    </Box>
                    <Box gridColumn={{ xs: 'span 1', sm: 'span 1', md: 'span 2' }}>
                      <RHFAutocomplete
                        name="district"
                        type="district"
                        label="District"
                        placeholder="Choose District"
                        fullWidth
                        options={districts.map((option) => option)}
                        getOptionLabel={(option) => option}
                        disabled={disable}
                      />
                    </Box>
                    <Box gridColumn={{ xs: 'span 1', sm: 'span 1', md: 'span 2' }}>
                      <RHFAutocomplete
                        name="state"
                        type="state"
                        label="State"
                        placeholder="Choose Your State"
                        fullWidth
                        options={states.map((option) => option)}
                        getOptionLabel={(option) => option}
                        disabled={disable}
                      />
                    </Box>
                    <Box gridColumn={{ xs: 'span 1', sm: 'span 1', md: 'span 2' }}>
                      <RHFTextField name="pincode" label="Pin Code" fullWidth disabled={disable}/>
                    </Box>
                    <Box gridColumn={{ xs: 'span 1', sm: 'span 1', md: 'span 2' }}>
                      <RHFAutocomplete
                        disabled={disable}
                        name="village"
                        type="village"
                        label="Village"
                        placeholder="Choose Your Village"
                        fullWidth
                        options={villages.map((option) => option)}
                        getOptionLabel={(option) => option}
                      />
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
            <Stack display={'flex'} alignItems={'flex-end'} sx={{ mt: 3 }}>
              <Box>
                <Button color="inherit" variant="outlined" sx={{ mr: '20px' }} onClick={() => setDisable(false)}>
                  Edit
                </Button>
                <LoadingButton
                  type='submit'
                  loading={isSubmitting}
                  variant="contained"
                >
                  Save
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </Box>
      </Container>
    </>
  );
}

