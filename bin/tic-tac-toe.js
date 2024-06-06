#!/usr/bin/env node
import readlineSync from 'readline-sync';
import process from 'process';

let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

let currentPlayer = 'X';

const printBoard = () => {
    for (let i = 0; i < 3; i++) {
        console.log(board[i].join(' | '));
        if (i < 2) console.log('---------');
    }
}

const checkWinner = () => {
    
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ' ') {
            return board[i][0];
        }
    }

    for (let j = 0; j < 3; j++) {
        if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] !== ' ') {
            return board[0][j];
        }
    }

    if ((board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') ||
        (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ')) {
        return board[1][1];
    }

    if (!board.flat().includes(' ')) {
        return 'ничья';
    }

    return null;
}

const nextStep = () => {
    printBoard();
    const row = readlineSync.questionInt(`Игрок ${currentPlayer}, выберите ряд (1-3) `) - 1;
    const col = readlineSync.questionInt(`Игрок ${currentPlayer}, выберите колонку (1-3) `) - 1;

    if (board[row][col] === ' ') {
        board[row][col] = currentPlayer;
        const winner = checkWinner();
        if (winner) {
            if (winner === 'ничья') {
                console.log("Это ничья!");
            } else {
                console.log(`Игрок ${winner} выигрывает!`);
            }
            process.exit();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            nextStep();
        }
    } else {
        console.log('Эта клетка уже занята!');
        nextStep();
    }
}

nextStep();
