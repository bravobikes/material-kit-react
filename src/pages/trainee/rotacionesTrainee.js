import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import Frame from 'src/pages/frame.js';
import Leaderboard from 'src/sections/overview/trainee/overview-leaderboard.js';
import Tienda from 'src/sections/overview/overview-tienda';
import RotacionReciente from 'src/components/RotacionReciente';
import HistRotaciones from 'src/components/HistRotaciones';
import { ProfileRotaciones } from 'src/components/ProfileRotaciones';
import {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Container,
  Pagination,
  Card,
  Stack,
  CardHeader,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';





const Page = () => {
  const id = localStorage.getItem('sessionUser');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([]);
  const [ultimaRotacion, setUltimaRotacion] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const getHistorialUrl = `http://localhost:5000/getHistoricoTrainee/${id}`;


  function renderView(index = null) {
    setSelectedUser(data[index])
    setShow(!show);
  }
  function renderEdit(index = null) {
    setSelectedUser(data[index])
    setShowEdit(!showEdit);
  }

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const response = await axios.get(getHistorialUrl);
        setData(response.data); 
        setUltimaRotacion(response.data[response.data.length-1]);
        // console.log('After setData:', response.data[response.data.length-1]);
        setIsLoading(false); 
        console.log(ultimaRotacion);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); 
      }
    };
  
    fetchData();
  }, []);


  return(<>
    <Head>
      <title>
        Rotaciones | Portal Ternium
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
                Rotaciones
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
        
        <Box sx={{marginTop:"2.5%"}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <ProfileRotaciones/>
              </Grid>
              <Grid item xs={12} sm={8}>
                  <RotacionReciente/>
              </Grid>
            </Grid>
            <HistRotaciones/>
            
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
