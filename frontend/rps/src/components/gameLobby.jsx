import  { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../socketContext/socketContext';


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
    <div>
      <h2>Game Lobby</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.username}{' '}
            <button onClick={() => handleChallenge(player.id)}>Play</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameLobby;
