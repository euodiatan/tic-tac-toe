import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserCreation from "./Pages/UserCreation"
import TicTacToe from "./Pages/Game"

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<UserCreation />} />
            <Route path="/game" element={<TicTacToe />} />
          </Routes>

        </Router>

      </div>
    </ChakraProvider>
  );
}

export default App;
