// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SocketProvider } from './socketContext/socketContext';
import Login from './components/login';
import GameLobby from './components/gameLobby';
import Game from './components/game';
import Leaderboard from './components/leaderboard';

const App = () => {
  return (
    <Router>
      <SocketProvider>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/lobby" element={<GameLobby />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </SocketProvider>
    </Router>
  );
};

export default App;
