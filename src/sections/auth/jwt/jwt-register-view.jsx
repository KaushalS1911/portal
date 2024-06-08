import React, { useState } from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import img from '../../../assets/images/loginbgnew.png';
import RegistrationForm from './registration-page-view';

export default function JwtRegisterView() {
  const [selectedVendor, setSelectedVendor] = useState();

  const handleChange = (e) => {
    setSelectedVendor(e.target.value);
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            backgroundImage: `url(${img})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            minHeight: '100vh',
            height: '100%',
          }}
        >
          <Box sx={{ px: '20px', pt: '130px' }}>
            <Box p={5} pb={0}>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: 'black' }}>
                  Select Vendor Category
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="vendor"
                  name="vendor"
                  value={selectedVendor}
                  onChange={handleChange}
                >
                  <FormControlLabel value="miller" control={<Radio />} label="Miller" />
                  <FormControlLabel value="Distributor" control={<Radio />} label="Distributor" />
                  <FormControlLabel
                    value="Miller & Distributor"
                    control={<Radio />}
                    label="Miller & Distributor"
                  />
                </RadioGroup>
              </FormControl>
              <br />
              <Box
                p={1}
                borderRadius="borderRadius"
                bgcolor="primary.main"
                color="white"
                className="subtal"
                sx={{ display: 'inline-block', borderRadius: '5px', mt: '10px' }}
              >
                <Typography variant="body1">
                  Online application for obtaining Provisional Permission for becoming a channel
                  sales partner
                </Typography>
              </Box>
            </Box>
            <Box p={3} pt={0} mt={5}>
              {selectedVendor && <RegistrationForm vendor_category={selectedVendor} />}
              <Typography color="error" variant="caption" display="block" mt={4}>
                You can only verify a Mobile number you own. You must be able to receive a SMS to
                the Mobile number you are trying to verify.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
