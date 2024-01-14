/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Flex, Button, Grid, GridItem, Text, Center } from '@chakra-ui/react';
import Note from './Note';
import { NoteProps, useNoteStore } from '../store/noteStore';

const ListNotes: React.FC = () => {
  const notes = useNoteStore((state) => state.notes)
  const setShowEditor = useNoteStore((state) => state.setShowEditor)
  const showEditor = useNoteStore((state) => state.showEditor)
  const searchQuery = useNoteStore((state) => state.searchQuery)
  const [filteredNotes, setFilteredNotes] = useState(notes)

  useEffect(() => {
    const filteredNotesList = notes.filter((note) => {
      const searchableFields: (keyof NoteProps)[] = ['title', 'description', 'content', 'tags'];
      return searchableFields.some((field) => {
        const fieldValue = note[field] as string;
        if (field === 'tags' && Array.isArray(fieldValue)) {
          const tagsString = fieldValue.join(' '); // Convert array to string
          return tagsString.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return fieldValue.toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
    setFilteredNotes(filteredNotesList)
  },[searchQuery, notes])

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
          filteredNotes.length  ?
            <Grid templateColumns="repeat(3, 1fr)" gap={4} justifyItems="center">
                {filteredNotes.map((note) => (
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
