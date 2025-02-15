import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import Frame from 'src/pages/frame.js';
import Leaderboard from 'src/sections/overview/trainee/overview-leaderboard.js';
import Tienda from 'src/sections/overview/overview-tienda';
import {useEffect, useRef, useState} from 'react';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';




const Page = () => {


  const frameRef = useRef(null);
  useEffect(() => {
    const calculateHeight = () => {
      const frame = frameRef.current;
      if (frame) {
        const containerWidth = frame.parentNode.offsetWidth;
        const aspectRatio = 2.2 / 1; 
        const height = containerWidth / aspectRatio;
        frame.style.height = `${height}px`;
      }
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  return(<>
    <Head>
      <title>
        Videojuego | Portal Ternium
      </title>
    </Head>
    <Box
      component="main"
      sx={{flexGrow:1, py: 8}}>
        <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
                Videojuego
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                
              </Stack>
            </Stack>
            
          </Stack>
          
        </Stack>
        
        <Box ref={frameRef} sx={{marginTop:"2.5%"}}>
          <Frame />
        </Box>
        <Box sx={{marginTop:"2.5%"}}>
            <Grid container sx={{width:"100%"}} spacing={2} >
              <Grid item sm={4} xs={12}>
                  <Leaderboard/>
              </Grid>
                <Grid item sm={8} xs={12}>
                  <Tienda/>
                </Grid>
            </Grid>
        </Box>
        </Container>

    </Box>
  </>);
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
