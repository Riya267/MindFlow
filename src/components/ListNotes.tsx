import React from 'react';
import { Flex, Button, Grid, GridItem } from '@chakra-ui/react';
import { dummyNotes } from '../App';
import Note from './Note';
import { useNoteStore } from '../store/noteStore';

const ListNotes: React.FC = () => {
  const { setCreateEditNote, createEditNote, notes } = useNoteStore();
  return (
    <>
      {!createEditNote.showEditor && (
        <>
          <Flex justify="flex-end">
            <Button colorScheme="teal" mr={3} mt={6} onClick={()=>setCreateEditNote({showEditor:true})}>
              Create New Note
            </Button>
          </Flex>
          { 
          notes.length  ?
            <Grid templateColumns="repeat(3, 1fr)" gap={4} justifyItems="center">
                {dummyNotes.map((note) => (
                <GridItem key={note.id} colSpan={1}>
                    <Note title={note.title} description={note.description} id={note.id.toString()} content={note.content}/>
                </GridItem>
                ))}
            </Grid> :
            <p> No Notes Currently</p> 
          }
        </>
      )}
    </>
  );
};

export default ListNotes;
