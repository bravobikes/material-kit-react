import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/detalles_empleado_info_astrainee';
import { AccountProfileDetails } from 'src/sections/account/detalles_empleado_forma_astrainee';


const Page = () => (
  <>
    <Head>
      <title>
        Profile | Portal Ternium
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Perfil
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
              justifyContent={"center"}
              
            >
              <Grid
                xs={12}
                md={6}
                lg={6}
              >
                <AccountProfile />
              </Grid>
              <Grid
                xs={12}
                md={12}
                lg={12}
              >
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
