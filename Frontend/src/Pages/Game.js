import { VStack, HStack, Button, Box, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";

function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));  // Represents the 3x3 board
  const [isXNext, setIsXNext] = useState(true);  // To track which player's turn

  const handleMove = (index) => {
    if (board[index] || winner) return;  // Return if the cell is occupied or game is won

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(board);

  return (
    <Flex bgColor="black" minH="100vh" justifyContent="center" alignItems="center">
        <HStack spacing={8}>
        <VStack spacing={4}>
            {Array(3).fill(null).map((_, rowIndex) => (
            <HStack spacing={4} key={rowIndex}>
                {Array(3).fill(null).map((_, colIndex) => {
                const index = rowIndex * 3 + colIndex;
                return (
                    <Button key={colIndex} size="lg" bg="white" color="black" fontSize={'8xl'} h="200px" w="200px" onClick={() => handleMove(index)}>
                    {board[index]}
                    </Button>
                );
                })}
            </HStack>
            ))}
        </VStack>
        
        <Box p={4} bg="gray.700" borderRadius="md">
            <Text fontSize="xl">{winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'X' : 'O'}`}</Text>
            {/* You can render other game information below */}
        </Box>
        </HStack>
    </Flex>
  );
}

export default Game;

// Helper function to calculate the winner of Tic-Tac-Toe
function calculateWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}
