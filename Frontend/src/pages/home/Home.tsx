import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  WrapItem,
  Center,
  Wrap,
  Box,
  Image,
  Progress
} from '@chakra-ui/react'
import { CrearProyecto, Configurar, Actividad, ConfirmarActividad, ConfigurarProyecto, AgregarActividad } from './Ventanas';
import { TransferButton } from './Transfer';

function Proyectos() {

  return (
    <GridItem h='100%' w='100%' bg='green'>
      <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(2,1fr)' gap={6}>
        <GridItem rowSpan={2} colSpan={1} bg='blue.500'>
          <Image src='https://webslima.net/wp-content/uploads/logotipo-constructora-cemex.jpg' alt='Dan Abramov' width='100%' />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg='blue.500'>
          Nombre del Proyecto
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg='blue.500'>
          $15000.00
        </GridItem>
        <GridItem rowSpan={1} colSpan={2} bg='blue.500'>
          Descripcion del Proyecto
        </GridItem>
      </Grid>
    </GridItem>
  )
}

function Actividades() {

  return (
    <GridItem rowSpan={1} colSpan={1} h='100%' w='100%' bg='green'>
      <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(2,1fr)' gap={6}>
        <GridItem rowSpan={1} colSpan={1} bg='blue.500'>
          Actividad
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg='blue.500'>
          $750 P
        </GridItem>
        <GridItem rowSpan={2} colSpan={1} bg='blue.500'>
          <Actividad />
        </GridItem>
        <GridItem rowSpan={1} colSpan={2} bg='blue.500'>
          Estado: No entregado
        </GridItem>
      </Grid>
    </GridItem>
  )
}


function Confirmar() {

  return (
    <GridItem rowSpan={1} colSpan={1} h='100%' w='100%' bg='green'>
      <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(2,1fr)' gap={6}>
        <GridItem rowSpan={1} colSpan={1} bg='blue.500'>
          Actividad
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg='blue.500'>
          $750 P
        </GridItem>
        <GridItem rowSpan={2} colSpan={1} bg='blue.500'>
          <ConfirmarActividad />
        </GridItem>
        <GridItem rowSpan={1} colSpan={2} bg='blue.500'>
          Estado: En Revision
        </GridItem>
      </Grid>
    </GridItem>
  )
}


function Home() {

  const proyectosArray = Array.from({ length: 4 }, (_, index) => index + 1);

  let Nombre = "";
  Nombre = "David Páez";

  let Correo = "";
  Correo = "paezdavid@gmail.com";

  let Telefono = 0;
  Telefono = 6641234567;

  return (

    <Grid
      h='800px'
      templateRows='repeat(5, 1fr)'
      templateColumns='repeat(5, 1fr)'
      gap={4}
    >
      <GridItem rowSpan={1} colSpan={4} bg='tomato'>
        <Wrap spacing='30px' padding='40px'>
          <WrapItem>
            <Center w='80px' h='80px' bg='green.200'>
              <Image src='https://i0.wp.com/lamiradafotografia.es/wp-content/uploads/2014/07/foto-perfil-psicologo-180x180.jpg?resize=180%2C180' alt='foto' h='100%' />
            </Center>
          </WrapItem>
          <WrapItem>
            <Center w='180px' h='80px' bg='red.200'>
              Nombre: {Nombre}
            </Center>
          </WrapItem>
          <WrapItem>
            <Center w='240px' h='80px' bg='green.200'>
              Correo: {Correo}
            </Center>
          </WrapItem>
          <WrapItem>
            <Center w='180px' h='80px' bg='green.200'>
              Telefono: {Telefono}
            </Center>
          </WrapItem>
        </Wrap>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1} bg='gray' padding='40px'>
        <Center>
          <Configurar />
        </Center>
      </GridItem>
      <GridItem rowSpan={4} colSpan={2} bg='papayawhip'>
        <Grid templateRows='repeat(5, 1fr)' gap={6}>
          <Proyectos />
          <GridItem h='80px' w='100%' bg='green'>
            <Center>
              <CrearProyecto />
            </Center>
          </GridItem>
        </Grid>
      </GridItem >
      <GridItem rowSpan={3} colSpan={3} bg='papayawhip' color='white'>
        <Grid
          h='250px'
          w="100%"
          templateRows='repeat(3, 1fr)'
          templateColumns='repeat(6, 1fr)'
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={2} bg='gray'>
            <Center><Image src='https://webslima.net/wp-content/uploads/logotipo-constructora-cemex.jpg' alt='Dan Abramov' h='160px' /></Center>
          </GridItem>
          <GridItem colSpan={2} bg='gray'>
            Nombre: Proyecto1
          </GridItem>
          <GridItem colSpan={2} bg='gray'>
            Financiamiento: $0.00
          </GridItem>
          <GridItem colSpan={4} bg='gray'>
            Descripción del Proyecto:
          </GridItem>
          <GridItem colSpan={6} bg='gray'>
            <Progress colorScheme='green' height='32px' value={80} margin='20px'/>
          </GridItem>
        </Grid>
        <Grid templateRows='repeat(3, 1fr)' templateColumns='repeat(2,1fr)' gap={6} padding='20px'>
          <Actividades />
          <Confirmar />
        </Grid>
      </GridItem>
      <GridItem rowSpan={1} colSpan={3} bg='tomato'>
        <ConfigurarProyecto />
        <AgregarActividad />
      </GridItem>
    </Grid >
  )
}

export { Home };
