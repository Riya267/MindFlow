import React from 'react';
import { Flex, Button, Grid, GridItem, Text, Center } from '@chakra-ui/react';
import Note from './Note';
import { useNoteStore } from '../store/noteStore';

const ListNotes: React.FC = () => {
  const notes = useNoteStore((state) => state.notes)
  const setShowEditor = useNoteStore((state) => state.setShowEditor)
  const showEditor = useNoteStore((state) => state.showEditor)

  return (
    <>
      {!showEditor && (
        <>
          <Flex justify="flex-end">
            <Button colorScheme="teal" mr={3} mt={6} onClick={()=>setShowEditor(true)}>
              Create New Note
            </Button>
          </Flex>
          { 
          notes.length  ?
            <Grid templateColumns="repeat(3, 1fr)" gap={4} justifyItems="center">
                {notes.map((note) => (
                <GridItem key={note.id} colSpan={1}>
                    <Note {...note}/>
                </GridItem>
                ))}
            </Grid> :
            <Center h="60vh">
              <Text fontSize="lg">Please Create Notes</Text>
            </Center>
          }
        </>
      )}
    </>
  );
};

export default ListNotes;
