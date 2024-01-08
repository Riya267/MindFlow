import React from 'react';
import { Flex, Button, Grid, GridItem, Text, Center } from '@chakra-ui/react';
import Note from './Note';
import { useNoteStore } from '../store/noteStore';

const ListNotes: React.FC = () => {
  const { setShowEditor, showEditor, notes } = useNoteStore();
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
                    <Note title={note.title} description={note.description} id={note.id} content={note.content}/>
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
