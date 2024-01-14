import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Textarea,
  Heading,
  Input,
  GridItem,
  Grid,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VisuallyHidden,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { NoteProps, useNoteStore } from '../store/noteStore';
import { v4 as uuidv4 } from 'uuid';

export const VisuallyHiddenLabel: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <FormLabel>
    <VisuallyHidden>{children}</VisuallyHidden>
  </FormLabel>
);

const MarkdownEditor: React.FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const setShowEditor = useNoteStore((state) => state.setShowEditor);
  const showEditor = useNoteStore((state) => state.showEditor);
  const existingNote = useNoteStore((state) => state.existingNote);
  const editNote = useNoteStore((state) => state.editNote);
  const addNote = useNoteStore((state) => state.addNote);
  const setExistingNote = useNoteStore((state) => state.setExistingNote);
  const initialNote = {
    id: '',
    title: '',
    description: '',
    content: '',
    tags: []
  };
  const [noteDetails, setNoteDetails] = useState<NoteProps>(() => initialNote);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existingNote) {
      setNoteDetails(existingNote);
    }
  }, [existingNote]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    if (key === 'tags') {
      const tagsArray = e.target.value.split(',').map((tag) => tag.trim());
      setNoteDetails(prevNoteDetails => ({
        ...prevNoteDetails,
        [key]: tagsArray,
      }));
    } else {
      setNoteDetails(prevNoteDetails => ({
        ...prevNoteDetails,
        [key]: e.target.value,
      }));
      
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!noteDetails.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!noteDetails.description.trim()) {
      errors.description = 'Description is required';
    }
    if (!noteDetails?.tags?.every((tag) => tag.trim())) {
      errors.tags = 'Please enter valid tags';
    }
    if (!noteDetails.content.trim()) {
      errors.content = 'Content is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveAction = () => {
    if (validateForm()) {
      if (noteDetails.id) {
        editNote(noteDetails.id, noteDetails);
        setExistingNote(initialNote);
      } else {
        addNote({ ...noteDetails, id: uuidv4() });
      }
      setNoteDetails(initialNote)
      setShowEditor(false);

    }
  };

  const handleCancelAction = () => {
    setExistingNote(initialNote);
    setNoteDetails(initialNote)
    setShowEditor(false);
  }

  return (
    <>
      {showEditor && (
        <form>
          <Flex justify="flex-end" m={2}>
            <Button
              type="button"
              size="sm"
              colorScheme="green"
              aria-label="Save Note"
              onClick={handleSaveAction}
            >
              Save Note
            </Button>
            <Button
              type="button"
              size="sm"
              colorScheme="blue"
              aria-label="Cancel Note"
              ml={4}
              onClick={handleCancelAction}
            >
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
                  <FormControl isInvalid={!!formErrors.title}>
                    <VisuallyHiddenLabel>Title</ VisuallyHiddenLabel>
                    <Input
                      id="title"
                      placeholder="Title"
                      size="md"
                      value={noteDetails.title || ''}
                      onChange={(e) => handleInputChange(e, 'title')}
                      required
                    />
                    <FormErrorMessage>{formErrors.title}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!formErrors.description}>
                    <VisuallyHiddenLabel>Description</VisuallyHiddenLabel>
                    <Input
                      id="description"
                      placeholder="Description"
                      size="md"
                      value={noteDetails.description || ''}
                      onChange={(e) => handleInputChange(e, 'description')}
                      required
                    />
                    <FormErrorMessage>{formErrors.description}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!formErrors.tags}>
                  <VisuallyHiddenLabel>Tags</ VisuallyHiddenLabel>
                    <Input
                      id="tags"
                      placeholder="Tags (comma-separated)"
                      size="md"
                      value={noteDetails?.tags?.join(', ')}
                      onChange={(e) => handleInputChange(e, 'tags')}
                    />
                    <FormErrorMessage>{formErrors.tags}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem rowSpan={2}>
                  {/* Right side (Textarea) */}
                  <FormControl isInvalid={!!formErrors.content}>
                    <VisuallyHiddenLabel>Content</VisuallyHiddenLabel>
                    <Textarea
                      id="content"
                      placeholder="Start typing..."
                      value={noteDetails.content || ''}
                      onChange={(e) => handleInputChange(e, 'content')}
                      ref={textAreaRef}
                      h="70vh"
                      required
                    />
                    <FormErrorMessage>{formErrors.content}</FormErrorMessage>
                  </FormControl>
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
        </form>
      )}
    </>
  );
};

export default MarkdownEditor;
