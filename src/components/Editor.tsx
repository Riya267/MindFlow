import React, { useRef, useState } from 'react';
import { Box, Textarea, Heading, Flex, Input } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownEditor: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return (
    <Flex justify="space-evenly" padding={4}>
      {/* Writing Area */}
      <Box>
        <Heading as="h2" size="md" mb={2}>
          Write your Text or Markdown:
        </Heading>
        <Input placeholder='Title' size='md' />
        <Input placeholder='Description' size='md' />
        <Textarea
          autoFocus
          placeholder="Start typing..."
          value={inputText}
          onChange={handleInputChange}
          ref={textAreaRef}
        />
      </Box>

      {/* Preview Area */}
      <Box>
        <Heading as="h2" size="md" mb={2}>
          Preview:
        </Heading>
        <Box p={4} borderWidth="1px" borderRadius="md">  
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{inputText}</ReactMarkdown>
        </Box>
      </Box>
    </Flex>
  );
};

export default MarkdownEditor;
