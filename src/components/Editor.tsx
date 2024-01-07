import React, { useRef, useState } from 'react';
import { Box, Textarea, Heading, Input, GridItem, Grid, Button, Flex } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useNoteStore } from '../store/noteStore';

const MarkdownEditor: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const {createEditNote} = useNoteStore();
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return (
    <>
      {createEditNote.showEditor && 
      <>
      <Flex justify="flex-end" m={2}>
            <Button
              size="sm"
              colorScheme="green"
              aria-label="Save Note" >Save Note</Button>
            <Button
              size="sm"
              colorScheme="blue"
              aria-label="Cancel Note" ml={4}>Cancel</Button>
      </Flex>
      <Grid templateColumns="repeat(2, 1fr)" gap={2} p={4}>
          {/* Writing Area */}
          <GridItem colSpan={1} h="100vh">
            <Grid templateRows={{ base: "repeat(6,1fr)" }} h="100%">
              <GridItem rowSpan={1}>
                {/* Left side (Title, Description) */}
                <Heading as="h2" size="md" m={4} ml={0}>
                  Write your Text or Markdown:
                </Heading>
                <Input placeholder="Title" size="md" />
                <Input placeholder="Description" size="md" />
              </GridItem>

              <GridItem rowSpan={2}>
                {/* Right side (Textarea) */}
                <Textarea
                  placeholder="Start typing..."
                  value={inputText}
                  onChange={handleInputChange}
                  ref={textAreaRef}
                  h="70vh" />
              </GridItem>
            </Grid>
          </GridItem>

          {/* Preview Area */}
          <GridItem colSpan={1} h="100vh">
            <Heading as="h2" size="md" m={4} ml={0}>
              Preview:
            </Heading>
            <Box p={4} borderWidth="1px" borderRadius="md" h="85vh">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{inputText}</ReactMarkdown>
            </Box>
          </GridItem>
        </Grid>
       </>
      }
    </>
  );
};

export default MarkdownEditor;
