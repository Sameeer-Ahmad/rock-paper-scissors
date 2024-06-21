import  { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SocketContext } from '../socketContext/socketContext';

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
    <div>
      <h2>Game</h2>
      {!gameOver && (
        <>
          <button onClick={() => handlePlay('rock')}>Rock</button>
          <button onClick={() => handlePlay('paper')}>Paper</button>
          <button onClick={() => handlePlay('scissors')}>Scissors</button>
          {opponentChoice && <p>Opponent chose: {opponentChoice}</p>}
          {result && <p>Result: {result}</p>}
          <p>Your score: {score}</p>
          <p>Opponent's score: {opponentScore}</p>
        </>
      )}
      {gameOver && (
        <>
          <p>Game Over</p>
          <button onClick={() => history('/leaderboard')}>View Leaderboard</button>
        </>
      )}
    </div>
  );
};

export default Game;


