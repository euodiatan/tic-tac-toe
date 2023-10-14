import React, { useState } from 'react';
import axios from 'axios';
import { VStack, Heading, Input, Button, Flex } from "@chakra-ui/react";


function CreateGame() {
    const [playerName, setPlayerName] = useState('');
    const [message, setMessage] = useState('');

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

    return (
        <div>
            <Flex bgColor="black" minH="100vh" color="white" justifyContent="center" alignItems="center">
                <VStack spacing={4} w="300px">
                    <Heading as="h1" size="2xl">Tic-Tac-Toe</Heading> 
                    <Input 
                        placeholder="Enter Player Name" 
                        _placeholder={{ color: 'gray.500', textAlign:'center' }}
                        bg="white"
                        color="black"
                        size="lg"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
                    
                    <Button colorScheme="teal" w="100%" onClick={createGameSession}>
                    Create Game
                    </Button>
                    
                    <Button colorScheme="orange" w="100%" onClick={() => { /* logic to join game */ }}>
                    Join Game
                    </Button>
                </VStack>
            </Flex>
        </div>
    );
}

export default CreateGame;
