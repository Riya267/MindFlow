import React, { useEffect, useRef, useState } from 'react';
import { Box, Textarea, Heading, Input, GridItem, Grid, Button, Flex } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { NoteProps, useNoteStore } from '../store/noteStore';
import { v4 as uuidv4 } from 'uuid';

const MarkdownEditor: React.FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const setShowEditor = useNoteStore((state) => state.setShowEditor);
  const showEditor = useNoteStore((state) => state.showEditor);
  const existingNote = useNoteStore((state) => state.existingNote);
  const editNote = useNoteStore((state) => state.editNote);
  const addNote = useNoteStore((state) => state.addNote);
  const [noteDetails, setNoteDetails] = useState<NoteProps>({
    id: '',
    title: '',
    description: '',
    content: '',
  });

  useEffect(() => {
    if (existingNote) {
      setNoteDetails(existingNote);
    }
  }, [existingNote]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
    setNoteDetails({
      ...noteDetails,
      [key]: e.target.value,
    });
  };

  const handleSaveAction = () => {
    if (noteDetails && Object.values(noteDetails).every((value) => Boolean(value))) {
      editNote(noteDetails.id, noteDetails);
    } else {
      addNote({...noteDetails, id: uuidv4()});
    }
    setShowEditor(false);
  };

  return (
    <>
      {showEditor && (
        <>
          <Flex justify="flex-end" m={2}>
            <Button
              size="sm"
              colorScheme="green"
              aria-label="Save Note"
              onClick={handleSaveAction}
            >
              Save Note
            </Button>
            <Button size="sm" colorScheme="blue" aria-label="Cancel Note" ml={4} onClick={() => setShowEditor(false)}>
              Cancel
            </Button>
          </Flex>
          <Grid templateColumns="repeat(2, 1fr)" gap={2} p={4}>
            {/* Writing Area */}
            <GridItem colSpan={1} h="100vh">
              <Grid templateRows={{ base: 'repeat(6,1fr)' }} h="100%">
                <GridItem rowSpan={1}>
                  {/* Left side (Title, Description) */}
                  <Heading as="h2" size="md" m={4} ml={0}>
                    Write your Text or Markdown:
                  </Heading>
                  <Input
                    placeholder="Title"
                    size="md"
                    value={noteDetails.title || ''}
                    onChange={(e) => handleInputChange(e, 'title')}
                  />
                  <Input
                    placeholder="Description"
                    size="md"
                    value={noteDetails.description || ''}
                    onChange={(e) => handleInputChange(e, 'description')}
                  />
                </GridItem>

                <GridItem rowSpan={2}>
                  {/* Right side (Textarea) */}
                  <Textarea
                    placeholder="Start typing..."
                    value={noteDetails.content || ''}
                    onChange={(e) => handleInputChange(e, 'content')}
                    ref={textAreaRef}
                    h="70vh"
                  />
                </GridItem>
              </Grid>
            </GridItem>

            {/* Preview Area */}
            <GridItem colSpan={1} h="100vh">
              <Heading as="h2" size="md" m={4} ml={0}>
                Preview:
              </Heading>
              <Box p={4} borderWidth="1px" borderRadius="md" h="85vh">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{noteDetails.content}</ReactMarkdown>
              </Box>
            </GridItem>
          </Grid>
        </>
      )}
    </>
  );
};

export default MarkdownEditor;
