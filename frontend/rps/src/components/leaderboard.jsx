import { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../socketContext/socketContext';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState({});
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('updateLeaderboard', (updatedLeaderboard) => {
      setLeaderboard(updatedLeaderboard);
    });

    return () => {
      socket.off('updateLeaderboard');
    };
  }, [socket]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {Object.entries(leaderboard).map(([username, score]) => (
          <li key={username}>
            {username}: {score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
