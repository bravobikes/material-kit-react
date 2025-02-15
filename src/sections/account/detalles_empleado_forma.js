import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField, 
  Select, 
  MenuItem,
  Unstable_Grid2 as Grid
} from '@mui/material';
import axios from 'axios';

export const AccountProfileDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formValue, setFormValue] = useState({
    ID_CET: '',
    apellidoMat: '',
    apellidoPat: '',
    clerical: '',
    descTitulo: '',
    escuela: '',
    esp: '',
    estado: '',
    fechNac: '',
    grad: '',
    isManager: '',
    nombre: '',
    origenCand: '',
    pais: '',
    posAct: '',
    posIngreso: '',
    remuneracion: '',
  });
  const [message, setMessage] = useState('');

  const getEmployeeUrl = `http://localhost:5000/getempleado/${id}`;
  const editUrl = `http://localhost:5000/putEmpleado`;

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(getEmployeeUrl);
      console.log('response:');
      console.log(response);
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

      setFormValue({ 
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
      });
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const handleInput = (e) => {
    console.log('formValue.isManager');
    console.log(formValue.isManager);
    const { name, value } = e.target;
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (event) => {
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      isManager: event.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(editUrl, formValue);
      if (response.status === 200) {
        setMessage('Empleado updated successfully');
      }
    } catch (error) {
      console.error('Error updating empleado:', error);
      setMessage('Error updating empleado');
    }
  }; 

  if (!id) {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card onSubmit={handleSubmit}>
          <CardHeader subheader="La información se puede editar." title="Información personal" />
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
                  onChange={handleInput}
                  required
                  value={formValue.nombre}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='text'
                  label="Apellido paterno"
                  name="apellidoPat"
                  onChange={handleInput}
                  required
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
                  onChange={handleInput}
                  required
                  value={formValue.apellidoMat}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='date'
                  label="Fecha de nacimiento"
                  name="fechNac"
                  onChange={handleInput}
                  required
                  // value={formValue.fechNac.toISOString().slice(0, 10)}
                  value={formValue.fechNac.toString().slice(0, 10)}
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
                  onChange={handleInput}
                  required
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
                  onChange={handleInput}
                  required
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
                  onChange={handleInput}
                  required
                  value={formValue.clerical}
                />
              </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardHeader subheader="La información se puede editar" title="Educación" />
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
                  onChange={handleInput}
                  required
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
                  onChange={handleInput}
                  required
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
                  onChange={handleInput}
                  required
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
                  onChange={handleInput}
                  required
                  value={formValue.grad}
                />
              </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardHeader subheader="La información se puede editar" title="Información Trainee" />
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
                  onChange={handleInput}
                  required
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
                  onChange={handleInput}
                  required
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
                  onChange={handleInput}
                  required
                  value={formValue.origenCand}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
              <Select
                value={formValue.isManager}
                onChange={handleSelectChange}
                sx={{
                  width: '100%',
                  // textAlign: 'center'
                }}
              >
                  <MenuItem value={true}>
                      Administrador
                  </MenuItem>
                  <MenuItem value={false}>
                      Trainee
                  </MenuItem>
              </Select>
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
                  onChange={handleInput}
                  required
                  value={'$' + formValue.remuneracion}
                />
              </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained">
              Actualizar información
            </Button>
          </CardActions>
        </Card>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
