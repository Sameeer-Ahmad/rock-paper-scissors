import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SocketContext } from '../socketContext/socketContext';
import { Box, Button, Heading, VStack, Text, Center, useColorModeValue } from '@chakra-ui/react';
import { FaHandRock, FaHandPaper, FaHandScissors } from 'react-icons/fa'; // Importing icons for Rock, Paper, Scissors

const Game = () => {
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const socket = useContext(SocketContext);
  const { id } = useParams();
  const history = useNavigate();

  const handlePlay = (choice) => {
    const opponentChoice = getRandomChoice();
    setOpponentChoice(opponentChoice);

    socket.emit('play', { playerId: socket.id, opponentId: id, choice, opponentChoice });
  };

  useEffect(() => {
    socket.on('result', ({ result, playerScore, opponentScore }) => {
      setResult(result);
      setScore(playerScore);
      setOpponentScore(opponentScore);
      if (playerScore >= 3 || opponentScore >= 3) {
        setGameOver(true);
      }
    });

    return () => {
      socket.off('result');
    };
  }, [socket, id]);

  const getRandomChoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  return (
    <Center height="100vh" bg={useColorModeValue("blue.500", "gray.700")} flexDirection="column">
      <Box padding="8" boxShadow="lg" borderRadius="md" bg="white" p="6" w={{ base: "90%", md: "60%" }} m="auto">
        <Heading as="h2" mb="4" >Game</Heading>
        <VStack spacing={4}>
          {!gameOver && (
            <>
              <Button leftIcon={<FaHandRock />} onClick={() => handlePlay('rock')}>
                Rock
              </Button>
              <Button leftIcon={<FaHandPaper />} onClick={() => handlePlay('paper')}>
                Paper
              </Button>
              <Button leftIcon={<FaHandScissors />} onClick={() => handlePlay('scissors')}>
                Scissors
              </Button>
              {opponentChoice && <Text fontSize="lg">Opponent chose: {opponentChoice}</Text>}
              {result && <Text fontSize="lg">Result: {result}</Text>}
              <Text fontSize="lg">Your score: {score}</Text>
              <Text fontSize="lg">Opponent's score: {opponentScore}</Text>
            </>
          )}
          {gameOver && (
            <>
              <Text fontSize="xl" fontWeight="bold">Game Over</Text>
              <Button mt={4} colorScheme="teal" onClick={() => history('/leaderboard')}>
                View Leaderboard
              </Button>
            </>
          )}
        </VStack>
      </Box>
    </Center>
  );
};

export default Game;
