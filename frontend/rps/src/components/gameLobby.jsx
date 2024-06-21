import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../socketContext/socketContext';
import { Box, Heading, List, ListItem, Button, IconButton, Center, Text } from '@chakra-ui/react';
import { IoIosPeople } from 'react-icons/io'; // Using an icon from React Icons

const GameLobby = () => {
  const [players, setPlayers] = useState([]);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('updatePlayers', (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    return () => {
      socket.off('updatePlayers');
    };
  }, [socket]);

  const handleChallenge = (opponentId) => {
    socket.emit('challenge', socket.id, opponentId);
    console.log(opponentId);

    navigate(`/game/${opponentId}`);
  };

  return (
    <Center height="100vh" bg="blue.500" flexDirection="column">
      <Box padding="8" boxShadow="lg" borderRadius="md" bg="white" p="6" w={{ base: "90%", md: "60%" }} m="auto" >
        <Heading as="h2" mb="4" textAlign={"center"}>Game Lobby</Heading>
        <List spacing={3}   p="4" >
          {players.map((player) => (
            <ListItem key={player.id} border={"1px solid gray"} borderColor="gray.300" p="2" borderRadius="md">
              <Box display="flex" alignItems="center" justifyContent="space-around">
                <Text mr="4" fontWeight="bold" fontSize="3xl" >{player.username}</Text>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => handleChallenge(player.id)}
                >
                  Play
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Center>
  );
};

export default GameLobby;
