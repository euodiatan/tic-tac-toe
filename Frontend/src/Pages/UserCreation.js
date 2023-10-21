import React, { useState, useContext } from 'react';
import axios from 'axios';
import styles from './css/styles.module.css';
import { CustomisationContext } from '../Components/CustomisationContext';


function CreateGame() {
    const [playerName, setPlayerName] = useState('');
    const [message, setMessage] = useState('');
    

    //Retrieve settings from CustomisationContext. Update this!
    const { accessibilityMode } = useContext(CustomisationContext);
    const { fontSize } = useContext(CustomisationContext);
    const { buttonSize } = useContext(CustomisationContext);
    const {fontColor } = useContext(CustomisationContext);
    const { buttonColor } = useContext(CustomisationContext);


    //Apply settings retrieved from CustomisationContext to specific attributes of specific elements, to be displayed depending on toggling of accessibility mode. Update this!
    const headerStyle = accessibilityMode ? { fontSize, color: fontColor } : {};
    const buttonStyle = accessibilityMode ? { fontSize: buttonSize, backgroundColor: buttonColor } : {};
    


    const createGameSession = () => {
        axios.post('http://127.0.0.01:5000/game', { player1_name: playerName })
            .then(response => {
                setMessage(`Game created! Game ID: ${response.data.game_id}`);
            })
            .catch(error => {
                console.error("Error creating game:", error);
                setMessage("Failed to create a game. Please try again.");
            });
    }
   //Apply the inline styles based on the accessibility mode settings deefined above.
    return (
        <div className={styles.flexcontainer}>
            <div className={styles.stack}>
                <h1 className={styles.heading} style={headerStyle}>Welcome!</h1>
                <button className={styles.btn1} style={buttonStyle} onClick={createGameSession}>
                    Login 
                </button>
                <button className={styles.btn1} style={buttonStyle} onClick={() => { /* logic to join game */ }}>
                    Register
                </button> 
            </div>
        </div>
    );
}

export default CreateGame;
