import React from 'react';
import { Input, IconButton, useColorMode, Grid, Center, GridItem } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import NotesExportImport from './NotesImportExport';
import { useNoteStore } from '../store/noteStore';

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const searchQuery = useNoteStore((state) => state.searchQuery);
  const setSearchQuery = useNoteStore((state) => state.setSearchQuery);

  return (
    <Grid
      as="header"
      templateColumns="repeat(5, 1fr)"
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
      padding={4}
      borderBottom="1px"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={1}
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
    >
      <GridItem colSpan={1} justifySelf={"flex-start"}>
        <NotesExportImport />
      </GridItem>
      
      <GridItem colSpan={3}>
        <Center>
          <Input
              type="text"
              placeholder="Search notes..."
              mx="auto"
              flex="1"
              maxWidth="400px"
              rounded="full"
              borderColor="gray.300"
              focusBorderColor="teal.500"
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
          />
        </Center>
      </GridItem>
      
      <GridItem colSpan={1} justifySelf={"flex-end"}>
          <IconButton
            aria-label="Toggle Dark/Light Mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            ml={4}
            size="md"
            rounded="full"
            bg="transparent"
            _hover={{ bg: 'gray.300' }}
          />
      </GridItem>
    </Grid>
  );
};

export default Header;
