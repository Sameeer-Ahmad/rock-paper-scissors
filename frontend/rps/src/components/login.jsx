import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../socketContext/socketContext';
import { Box, Button, Input, VStack, HStack, Icon, Center, useColorModeValue } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa'; // Example icon import

const Login = () => {
  const [username, setUsername] = useState('');
  const socket = useContext(SocketContext);
  const history = useNavigate();
  const bgColor = useColorModeValue("blue.500", "gray.800");

  const handleLogin = () => {
    if (username.trim()!== '') {
      socket.emit('join', username);
      history('/lobby');
    }
  };

  return (
    <Center height="100vh" bg={bgColor} flexDirection="column">
      <Box padding="6" boxShadow="lg" borderRadius="md" bg="white" p="6" w={{ base: "90%", md: "60%" }} m="auto">
        <VStack spacing={5}>
          <HStack spacing={2} align="center">
            <Icon as={FaUser} boxSize={6} />
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="md"
            />
          </HStack>
          <Button colorScheme="teal" onClick={handleLogin} width="full">
            Login
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
