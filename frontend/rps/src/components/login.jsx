import  { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../socketContext/socketContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const socket = useContext(SocketContext);
  const history = useNavigate();

  const handleLogin = () => {
    if (username.trim() !== '') {
      socket.emit('join', username);
      history('/lobby');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
