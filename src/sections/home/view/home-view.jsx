import { useScroll } from 'framer-motion';
import background from '../../../assets/images/loginbgnew.png';
import user from '../../../assets/images/small.png';
import { paths } from 'src/routes/paths';

import { Box, Button, Container, Grid, Typography, Paper } from '@mui/material';

import ScrollProgress from 'src/components/scroll-progress';

import { PATH_AFTER_LOGIN } from '../../../config-global';
import { RouterLink } from '../../../routes/components';

// ----------------------------------------------------------------------

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <Box
        sx={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Container>
          <Box>
            <Paper sx={{ px: 4, py: 5, my: 2, bgcolor: 'light' }}>
              <Grid container alignItems="center" spacing={3}>
                <Grid item xs={12} md={6} order={{ md: 1, xs: 2 }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Apply For Provisional Permission for Milling & Distribution
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        my: 2,
                        mr: 2,
                        border: 'solid 1px #1ABC9C',
                        backgroundColor: 'white',
                        transition: '0.3s',
                        color: '#1ABC9C',
                        '&:hover': {
                          color: 'white',
                          backgroundColor: '#1ABC9C',
                          border: 'solid 1px #1ABC9C',
                        },
                      }}
                      onClick={() => navigate('/instructions')}
                    >
                      VIEW INSTRUCTIONS
                    </Button>
                    <Typography variant="h6" gutterBottom>
                      Apply For Provisional Permission for Milling
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        my: 2,
                        mr: 2,
                        border: 'solid 1px #1ABC9C',
                        backgroundColor: 'white',
                        transition: '0.3s',
                        color: '#1ABC9C',
                        '&:hover': {
                          color: 'white',
                          backgroundColor: '#1ABC9C',
                          border: 'solid 1px #1ABC9C',
                        },
                      }}
                      onClick={() => navigate('/instructions')}
                    >
                      VIEW INSTRUCTIONS
                    </Button>
                    <Typography variant="h6" gutterBottom>
                      Apply For Provisional Permission for Distribution
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        my: 2,
                        mr: 2,
                        border: 'solid 1px #1ABC9C',
                        backgroundColor: 'white',
                        transition: '0.3s',
                        color: '#1ABC9C',
                        '&:hover': {
                          color: 'white',
                          backgroundColor: '#1ABC9C',
                          border: 'solid 1px #1ABC9C',
                        },
                      }}
                      onClick={() => navigate('/instructions')}
                    >
                      VIEW INSTRUCTIONS
                    </Button>

                    <Box sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ height: 60, width: 46, mr: 2 }}>
                        <img src={user} alt="logo" />
                      </Box>
                      <Box>
                        <Typography variant="body1">Helpdesk 24/7 | 9 AM to 7 PM</Typography>
                        <Typography variant="body1" color="primary">
                          Toll Free Number : 18002026290
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ position: 'relative' }} order={{ md: 2, xs: 1 }}>
                  <Typography
                    component={'span'}
                    sx={{ display: { md: 'block', xs: 'none' } }}
                    className="ak-login-devider"
                  ></Typography>
                  <Box
                    sx={{
                      display: { md: 'flex', xs: 'block' },
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}
                  >
                    <Box textAlign="center" my={{ md: 0, xs: 2 }}>
                      <Typography variant="h5" gutterBottom>
                        If already registered?
                      </Typography>
                      <Button
                        className="button"
                        variant="contained"
                        component={RouterLink} href={PATH_AFTER_LOGIN}
                      >
                        LOGIN
                      </Button>
                    </Box>
                    <Box textAlign="center">
                      <Typography variant="h5" gutterBottom>
                        For New Registration
                      </Typography>
                      <Button
                        className="aqua-back"
                        variant="contained"
                        component={RouterLink} href={paths.auth.jwt.register}
                      >
                        Registration
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
}
