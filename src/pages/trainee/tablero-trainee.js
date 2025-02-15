import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/trainee/overview-salario';
import { OverviewLatestOrders } from 'src/sections/overview/trainee/overview-cursos-tomados-tabla';
import { OverviewLatestProducts } from 'src/sections/overview/trainee/overview-cursos-restantes';
import { OverviewSales } from 'src/sections/overview/trainee/overview-cursos-toamdos-bar';
import { OverviewTasksProgress } from 'src/sections/overview/trainee/overview-progreso-cursos';
import { OverviewTotalCustomers } from 'src/sections/overview/trainee/overview-cursos-tomados';
import { OverviewTotalProfit } from 'src/sections/overview/trainee/overview-monedas';
import { OverviewTraffic } from 'src/sections/overview/trainee/overview-areas-cursos-tomados';
import { useEffect, useState } from 'react';
import axios from 'axios';

const now = new Date();

const Page = () => {

  const id = localStorage.getItem('sessionUser');

  const [formValue, setFormValue] = useState({
    ID_CET: '',
    apellidoMat: '',
    apellidoPat: '',
    clerical: '',
    descTitulo: '',
    escuela: '',
    esp: '',
    estado: '',
    fechNacDia: new Date(),
    grad: '',
    isManagerStr: '',
    nombre: '',
    origenCand: '',
    pais: '',
    posAct: '',
    posIngreso: '',
    remuneracion: '',
  });
  const [cursosEncuadre, setCursosEncuadre] = useState([])
  const [cursosTomados, setCursosTomados] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);

  const getEmployeeUrl = `http://localhost:5000/getempleado/${id}`;
  const getUserUrl = `http://localhost:5000/getUser/${id}`;
  const getcursosTomadosUrl = `http://localhost:5000/getCursosTomados/${id}`;
  const getcursosEncuadreUrl = `http://localhost:5000/getCursosEncuadre/${id}`;

  useEffect(() => {
    console.log(cursosEncuadre);

    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(getEmployeeUrl);
      const cursosTomadosResponse = await axios.get(getcursosTomadosUrl);
      const cursosEncuadreResponse = await axios.get(getcursosEncuadreUrl);
      const userResp = await axios.get(getUserUrl);
      const cursosTomadosCant = cursosTomadosResponse.data[""];
      console.log(cursosEncuadreResponse);
      setCursosTomados(cursosTomadosCant.toString());
      setUser(userResp.data);
      setCursosEncuadre(cursosEncuadreResponse.data);
      setIsLoading(false);

      console.log('response cursosTomados:');
      const { 
        ID_CET,
        apellidoMat,
        apellidoPat,
        clerical,
        descTitulo,
        escuela,
        esp,
        estado,
        fechNac,
        grad,
        isManager,
        nombre,
        origenCand,
        pais,
        posAct,
        posIngreso,
        remuneracion,
      } = response.data;
      const datePart = fechNac.split('T')[0];
      const isManagerStr = true ? 'Administrador' : 'Trainee';
      const fechNacDia = new Date(datePart);
      // console.log('fechNacDia:');
      // console.log(fechNacDia);
      setFormValue({ 
        ID_CET,
        apellidoMat,
        apellidoPat,
        clerical,
        descTitulo,
        escuela,
        esp,
        estado,
        fechNacDia,
        grad,
        isManagerStr,
        nombre,
        origenCand,
        pais,
        posAct,
        posIngreso,
        remuneracion, 
      });
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  return(
    <>
    <Head>
      <title>
        Tablero | Portal Ternium
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
      >
        {isLoading ? (
              <div>Loading...</div> 
            ) : (
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
          >
          <Grid
            xs={12}
            sm={6}
            lg={3}
            >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              // value="$24k"
              value={'$' + new Intl.NumberFormat().format(formValue.remuneracion) }
              />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
            >
            <OverviewTotalCustomers
              difference={25}
              positive={false}
              sx={{ height: '100%' }}
              value={cursosTomados}
              />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
            >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={75.5}
              />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
            >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value={user.monedas}
              />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'This year',
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                },
                {
                  name: 'Last year',
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={['RH', 'Portal', 'Integridad']}
              sx={{ height: '100%' }}
              salario={formValue.remuneracion}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewLatestProducts
              products={[
                {
                  id: '5ece2c077e39da27658aa8a9',
                  image: '/assets/products/product-1.png',
                  name: 'Ternium tiene nuevas oficinas',
                  updatedAt: subHours(now, 6).getTime()
                },
                {
                  id: '5ece2c0d16f70bff2cf86cd8',
                  image: '/assets/products/product-2.png',
                  name: 'Ternium abre nueva planta',
                  updatedAt: subDays(subHours(now, 8), 2).getTime()
                },
                {
                  id: 'b393ce1b09c1254c3a92c827',
                  image: '/assets/products/product-5.png',
                  name: 'Global trainees tienen nueva pagina!',
                  updatedAt: subDays(subHours(now, 1), 1).getTime()
                },
                {
                  id: 'a6ede15670da63f49f752c89',
                  image: '/assets/products/product-6.png',
                  name: 'Competencia Ternium',
                  updatedAt: subDays(subHours(now, 3), 3).getTime()
                },
                {
                  id: 'bcad5524fe3a2f8f8620ceda',
                  image: '/assets/products/product-7.png',
                  name: 'Premios Ternium 2023',
                  updatedAt: subDays(subHours(now, 5), 6).getTime()
                }
              ]}
              sx={{ maxHeight: '50vh', overflow:"auto" }}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <OverviewLatestOrders
              orders = {cursosEncuadre}
              orders2={[
                {
                  id: 'f69f88012978187a6c12897f',
                  ref: 'DEV1049',
                  amount: 30.5,
                  customer: {
                    name: 'Ekaterina Tankova'
                  },
                  createdAt: 1555016400000,
                  endedAt: 1555016400000 + 1000000000,
                  status: 'faltante'
                },
                {
                  id: '9eaa1c7dd4433f413c308ce2',
                  ref: 'DEV1048',
                  amount: 25.1,
                  customer: {
                    name: 'Cao Yu'
                  },
                  createdAt: 1555016400000,
                  endedAt: 1555016400000 + 1000000000,
                  status: 'completado'
                },
                {
                  id: '01a5230c811bd04996ce7c13',
                  ref: 'DEV1047',
                  amount: 10.99,
                  customer: {
                    name: 'Alexa Richardson'
                  },
                  createdAt: 1554930000000,
                  endedAt: 1554930000000 + 1000000000,
                  status: 'faltante'
                },
                {
                  id: '1f4e1bd0a87cea23cdb83d18',
                  ref: 'DEV1046',
                  amount: 96.43,
                  customer: {
                    name: 'Anje Keizer'
                  },
                  createdAt: 1554757200000,
                  endedAt: 1554757200000 + 1000000000,
                  status: 'faltante'
                },
                {
                  id: '9f974f239d29ede969367103',
                  ref: 'DEV1045',
                  amount: 32.54,
                  customer: {
                    name: 'Clarke Gillebert'
                  },
                  createdAt: 1554670800000,
                  endedAt: 1554670800000 + 1000000000,
                  status: 'completado'
                },
                {
                  id: 'ffc83c1560ec2f66a1c05596',
                  ref: 'DEV1044',
                  amount: 16.76,
                  customer: {
                    name: 'Adam Denisov'
                  },
                  createdAt: 1554670800000,
                  endedAt: 1554670800000 + 1000000000,
                  status: 'completado'
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
      )}
    </Box>
  </>
);
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
