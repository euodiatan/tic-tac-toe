import './App.css';
import { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserCreation from "./Pages/UserCreation";
import TicTacToe from "./Pages/Game";
import { CustomisationProvider, CustomisationContext } from './Components/CustomisationContext';
import CustomisationPage from './Pages/CustomisationPage';
import ToggleButton from './Components/ToggleButton';

function MainContent() {

    return (
        <div className="App">
            {/* Toggle Button for Accessibility Mode */}
            <div className="toggle-container">
                <ToggleButton />
            </div>

            <Router>
                <Routes>
                    <Route path="/" element={<UserCreation />} />
                    <Route path="/game" element={<TicTacToe />} />
                    <Route path="/customisation" element={<CustomisationPage/>} />
                </Routes>
            </Router>
        </div>
    );
}

function App() {
  return (
    <CustomisationProvider>
      <MainContent />
    </CustomisationProvider>
  );
}

export default App;
