



const gameBoard = (() => {
  
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const getBoard = () => { return board;}
    
    const renderBoard = () => {
        items = displayController.getBoardItems();
        let count = 0;
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                items[count].textContent = board[i][j];
                count++;
            }
        }
        
    };

    const modifyArray = (row, col, value) => {
        
        board[row][col] = value;
        
        renderBoard();
    }

    const clearBoardArray = () => {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        renderBoard();
    }
    return {  modifyArray, getBoard, clearBoardArray }; 
})();

const player = (marker) => {
    const playerMarker = marker;
    
    const handleMarkerPlacement = (e) => {
        if (gameHandler.getGameOver()) return;
        if (e.target.textContent === '') {
        gameBoard.modifyArray(e.target.getAttribute('data-row'), e.target.getAttribute('data-col'), playerMarker);    
        gameHandler.checkForWin(e.target.getAttribute('data-row'), e.target.getAttribute('data-col'), playerMarker);
        }
    }
    

    return { playerMarker, handleMarkerPlacement };
}

playerOne = player('X');
playerTwo = player('O');




const gameHandler = (() => {
    let gameOver = false;
    let currentPlayer = playerOne;
    let playerToggle = true;
    let moveCount = 0;

    const getGameOver = () => gameOver;

    const getCurrentPlayer = () => currentPlayer;

    const placeMarker = (e) => {
        currentPlayer.handleMarkerPlacement(e);
    }

    const restartGame = (quickRestart) => {
        gameOver = false;
        if(!quickRestart) displayController.toggleGameOverScreen(false);
        
        gameBoard.clearBoardArray();
        playerToggle = true;
        currentPlayer = playerOne;
        moveCount = 0;
        displayController.updateTurnText();
        displayController.toggleMarkerAnims();
    }


    const handleGameOver = () => {
        gameOver = true;
        displayController.toggleGameOverScreen(false);
        
    }

    const checkRowForWin = (row, playerMarker) => {
        let rowCount = 0;
        gameBoard.getBoard()[row].forEach( item => {
            if (item === playerMarker) {
                
                rowCount++;
                if(rowCount >= 3) {
                    
                    handleGameOver();
                }
            }
        })
        
    }

    const checkColForWin = (col, playerMarker) => {
        let colCount = 0;
        for (let i = 0; i < 3 ; i++) {
            if(gameBoard.getBoard()[i][col] === playerMarker){
                 colCount++;
                 
                 if (colCount >= 3){
                    handleGameOver();
                     
                 }
            } 
         }
        
    }

    const checkTopDiagForWin = (playerMarker) => {
        let x = 0;
        let y = 0;
        let diagCount = 0;
      

        for(let i = 0; i < 3; i++) {
            
            if(gameBoard.getBoard()[y][x] == playerMarker) {
                diagCount++;
                if (diagCount >= 3) {
                    handleGameOver();
                }
            }
            x++;
            y++;
        }
       
    }

    const checkBottomDiagForWin = (playerMarker) => {
        let x = 0;
        let y = 2;
        let diagCount = 0;

        for(let i = 0; i < 3; i++) {
            
            if(gameBoard.getBoard()[y][x] == playerMarker) {
                diagCount++;
                if (diagCount >= 3) {
                    handleGameOver();
                }
            }
            x++;
            y--;
        }
       
    }

    const handleTieGame = () => {
        gameOver = true;
        displayController.toggleGameOverScreen(true);
    }

    

    const checkForWin = (row, col, playerMarker) => {
        moveCount++;
        

        checkRowForWin(row, playerMarker);
        checkColForWin(col, playerMarker);
        checkTopDiagForWin(playerMarker);
        checkBottomDiagForWin(playerMarker);

        if (moveCount >= 9 && gameOver != true) {
            handleTieGame();
        }
        playerToggle = !playerToggle;
        currentPlayer = playerToggle ? playerOne : playerTwo;
        
        displayController.updateTurnText();
        
    }

    return { checkForWin, getGameOver, restartGame, getCurrentPlayer, placeMarker};
})(); 




const displayController = (() => {
    const getBoardItems = () => document.querySelectorAll('.gameboard-box');
    const playerTurnText = document.querySelector('.player-turn-txt');
    const mainRestartBtn = document.querySelector('#main-restart');

    mainRestartBtn.addEventListener('click', () => {
        gameHandler.restartGame(true);
    });

    const updateTurnText = () => {
        playerTurnText.textContent =`Player ${gameHandler.getCurrentPlayer().playerMarker}'s turn!`;
    }

    const toggleMarkerAnims = () => {
        getBoardItems().forEach(item => {
            item.classList.remove('animateMarker');
        })  
    }

    const toggleGameOverScreen = (tiedGame) => {
        const wrapper = document.querySelector('.game-over-screen');
        const winnerTxt = document.querySelector('.winner-text');
        const main = document.querySelector('.main');
        const header = document.querySelector('.header');
        const restartBtn = document.querySelector('.restartBtn');
        
        if (tiedGame) {
            winnerTxt.textContent = `Tie game! No Winner!`;
        } 
        else {
        winnerTxt.textContent = `Player ${gameHandler.getCurrentPlayer().playerMarker} has won!`;
        }
        wrapper.classList.toggle('active');
        main.classList.toggle('blur');
        header.classList.toggle('blur');

       
        restartBtn.addEventListener('click',() => {
            gameHandler.restartGame(false);
        } );

    }
    
    getBoardItems().forEach( item => {
       item.addEventListener('click',(e) => {
            gameHandler.placeMarker(e);
            item.classList.add('animateMarker');
       } );
       
    })

    return { getBoardItems, toggleGameOverScreen, updateTurnText, toggleMarkerAnims};
})();




