import React from 'react';
import { Flex, Input, IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding={4}
      borderBottom="1px"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={1}
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
    >
      {/* Search Bar */}
        <Input
            type="text"
            placeholder="Search notes..."
            mx="auto"
            flex="1"
            maxWidth="400px"
            rounded="full"
            borderColor="gray.300"
            focusBorderColor="teal.500"
        />
      
      {/* Dark/Light Mode Toggle */}
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
    </Flex>
  );
};

export default Header;
