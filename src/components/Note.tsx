import React from 'react';
import { Box, Flex, Heading, Text, IconButton, useColorMode } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { NoteProps, useNoteStore } from '../store/noteStore';

const Note: React.FC<NoteProps> = ({ title, description, id, content}) => {
  const { colorMode } = useColorMode();
  const setShowEditor = useNoteStore(state => state.setShowEditor);
  const setExitingNote = useNoteStore(state => state.setExistingNote);
  const deleteNote = useNoteStore(state => state.deleteNote);

  const handleEditAction = () => {
      setExitingNote({
          id,
          title,
          description,
          content
      })
      setShowEditor(true)
  }

  const handleDeleteAction = () => deleteNote(id)

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      bg={colorMode === 'light' ? 'white' : 'gray.700'}
      p={4}
      m={4}
      width="300px"
    >
      <Heading fontSize="xl" mb={2}>
        {title}
      </Heading>
      <Text color="gray.500" mb={4}>
        {description}
      </Text>
      <Flex justify="space-between">
        <IconButton
          icon={<EditIcon />}
          size="sm"
          colorScheme="teal"
          aria-label="Edit Note"
          onClick={handleEditAction}
        />
        <IconButton
          icon={<DeleteIcon />}
          size="sm"
          colorScheme="red"
          aria-label="Delete Note"
          onClick={handleDeleteAction}
        />
      </Flex>
    </Box>
  );
};

export default Note;
