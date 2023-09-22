
import { Grid, GridItem, Box, Image } from '@chakra-ui/react';
import * as project from './projects.json';


function GridA() {

    let Nombre: string = "";
    Nombre = "David";

    return (
        <Grid
            h='800px'
            templateRows='repeat(5, 1fr)'
            templateColumns='repeat(6, 1fr)'
            gap={4}
        >
            <GridItem rowSpan={3} colSpan={2} bg='tomato'>
                <Grid
                    h='200px'
                    templateRows='repeat(5, 1fr)'
                    templateColumns='repeat(5, 1fr)'
                    gap={4}
                >
                    <GridItem rowSpan={1} colSpan={5} bg='tomato'>
                        <Box bg='tomato' w='100%' p={4} color='white'>
                            Proyecto: {project.proyecto}
                            Financiamiento: {project.financiamiento}
                            Lider: {project.lider}
                            Telefono: {project.telefono}
                        </Box>
                    </GridItem>
                    <GridItem rowSpan={3} colSpan={5} bg='tomato'>
                        <Box boxSize='sm'>
                            <Image
                                borderRadius='full'
                                boxSize='150px'
                                src='https://bit.ly/dan-abramov'
                                alt='Dan Abramov'
                            />
                        </Box>
                    </GridItem>
                </Grid>
            </GridItem>
            <GridItem rowSpan={3} colSpan={3} bg='tomato'>
                <Box bg='tomato' w='100%' p={4} color='white'>
                    <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' width={50} />
                    Proyecto: {Nombre}
                </Box>
                <Box bg='tomato' w='100%' p={4} color='white'>
                    <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' width={50} />
                    Proyecto: {Nombre}
                </Box>
                <Box bg='tomato' w='100%' p={4} color='white'>
                    <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' width={50} />
                    Proyecto: {Nombre}
                </Box>
                <Box bg='tomato' w='100%' p={4} color='white'>
                    <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' width={50} />
                    Proyecto: {Nombre}
                </Box>
            </GridItem>
            <GridItem rowSpan={3} colSpan={1} bg='tomato' />
            <GridItem rowSpan={2} colSpan={6} bg='tomato' />
        </Grid>
    )
}

export { GridA };
