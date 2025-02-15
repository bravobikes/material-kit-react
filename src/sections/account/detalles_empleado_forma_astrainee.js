import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  InputLabel,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
  TableHead,
  Link,
  Select,
  MenuItem,
  Typography,
  SvgIcon,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import axios from 'axios';

export const AccountProfileDetails = () => {
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
  const [message, setMessage] = useState('');
  const [areaMessage, setAreaMessage] = useState('');
  const [areasInteres, setAreasInteres] = useState([]);
  const [areasInteresEmpleado, setAreasInteresEmpleado] = useState([]);
  const [selectedArea, setSelectedArea] = useState(0);


  const getEmployeeUrl = `http://localhost:5000/getempleado/${id}`;
  const editUrl = `http://localhost:5000/updatepeople/${id}`;
  const getAreasInteresUrl = `http://localhost:5000/getAreasInteres`;
  const getAreasInteresEmpleadoUrl = `http://localhost:5000/getAreasInteresEmpleado/${id}`;
  const postAreaInteresUrl = `http://localhost:5000/postAreaInteres/${id}`;
  const deleteAreaInteresUrl = `http://localhost:5000/deleteAreaInteres/${id}/`;

  useEffect(() => {
    console.log(areasInteresEmpleado)
    if (id) {
      fetchEmployee();
      fetchAreasInteres();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(getEmployeeUrl);

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


  const fetchAreasInteres = async () => {
    try {
      const areasInteresResponse = await axios.get(getAreasInteresUrl);
      const areasInteresEmpleadoResponse = await axios.get(getAreasInteresEmpleadoUrl);
      setAreasInteres(areasInteresResponse.data);
      setAreasInteresEmpleado(areasInteresEmpleadoResponse.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  }; 

  const handleDeleteArea = async (areaId) => {
    try {
      const response = await axios.delete(deleteAreaInteresUrl + areaId);
      
      if (response.status === 200) {
        fetchAreasInteres();
      } else {
        console.error('Failed to delete area:', response.data);
      }
    } catch (error) {
      console.error('Error deleting area:', error);
    }
  };


  

  const renderTableColumns = (startIndex, endIndex) => {
    return areasInteresEmpleado.slice(startIndex, endIndex).map((area, index) => (
      <TableRow key={index}>
      <TableCell>{area.area}</TableCell>
      <TableCell>
        <IconButton onClick={() => handleDeleteArea(area.nombreAreaId)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
    ));
  };

  const handleAreaChange = (event) => {
    console.log(selectedArea);
    setSelectedArea(event.target.value);
  };

  const handleAddArea = async () => {
    try {
          const response = await axios.post(postAreaInteresUrl, {selectedArea});
          console.log('Área added:', response.data);
          fetchAreasInteres();
          setAreaMessage("Área de interés agregada correctamente")

        

    } catch (error) {
      setAreaMessage("Error agregando área")
      console.error('Error adding área:', error);
    }
  };

  if (!id) {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      <form autoComplete="off" noValidate>
        <Card>
          <CardHeader title="Información personal" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Nombre"
                  name="nombre"
                  value={formValue.nombre}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  aria-readonly="true"
                  fullWidth
                  type='text'
                  label="Apellido paterno"
                  name="apellidoPat"
                  value={formValue.apellidoPat}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Apellido materno"
                  name="apellidoMat"
                  value={formValue.apellidoMat}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Fecha de nacimiento"
                  name="fechNac"
                  value={formValue.fechNacDia}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Pais"
                  name="pais"
                  value={formValue.pais}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Estado"
                  name="estado"
                  type='text'
                  value={formValue.estado}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Clerical"
                  name="clerical"
                  type='text'
                  value={formValue.clerical}
                />
              </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardHeader title="Educación" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  // helperText="Ingrese nombre de usuario"
                  label="Descripción del título"
                  name="descTitulo"
                  value={formValue.descTitulo}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Especialidad"
                  name="esp"
                  value={formValue.esp}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Escuela"
                  name="escuela"
                  value={formValue.escuela}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Estado graduación"
                  name="pais"
                  value={formValue.grad}
                />
              </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardHeader title="Información Trainee" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  // helperText="Ingrese nombre de usuario"
                  label="Posición actual"
                  name="posAct"
                  value={formValue.posAct}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Posición de ingreso"
                  name="posIngreso"
                  value={formValue.posIngreso}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Origen de candidato"
                  name="origenCand"
                  value={formValue.origenCand}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Puesto"
                  name="isManagerStr"
                  value={formValue.isManagerStr}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Remuneración"
                  name="remuneracion"
                  value={'$' + formValue.remuneracion}
                />
              </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <Grid container>
            <Grid item xs={12} md={6}>
              <CardHeader title="Intereses de areas" />
            </Grid>
            <Grid item xs={12} md={6}>
            {areaMessage && <p>{areaMessage}</p>}
              {/* Select and button */}
        <Select value={selectedArea} onChange={handleAreaChange}>
          {areasInteres.map((area, index) => (
            <MenuItem key={index} value={area.nombreAreaId}>
              {area.area}
            </MenuItem>
          ))}
        </Select>
        <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  onClick={handleAddArea}
                  variant="contained"
                  sx={{ marginLeft: '10px' }}
                >
                  Agregar Área
                </Button>
            </Grid>

          </Grid>
          <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {/* First column of the table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Áreas de Interés Actuales</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTableColumns(0, areasInteresEmpleado.length/2)}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} md={6}>
        {/* Second column of the table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>------------------</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTableColumns(areasInteresEmpleado.length/2, areasInteresEmpleado.length)}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

    </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained">
              Save details
            </Button>
          </CardActions>
        </Card>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
