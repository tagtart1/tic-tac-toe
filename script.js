



const gameBoard = (() => {
  
    const board = [
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
        console.log(board);
    };

    const modifyArray = (row, col, value) => {
        
        board[row][col] = value;
        
        renderBoard();
    }
    return { renderBoard, modifyArray, getBoard }; 
})();

const player = (marker) => {
    const playerMarker = marker;
    
    const handleMarkerPlacement = (e) => {
        if (e.target.textContent === '')
        gameBoard.modifyArray(e.target.getAttribute('data-row'), e.target.getAttribute('data-col'), playerMarker);    
        gameHandler.checkForWin(e.target.getAttribute('data-row'), e.target.getAttribute('data-col'));
    }
    

    return { playerMarker, handleMarkerPlacement };
}

playerOne = player('X');

const displayController = (() => {
     const getBoardItems = () => document.querySelectorAll('.gameboard-box');
      
     getBoardItems().forEach( item => {
        item.addEventListener('click', playerOne.handleMarkerPlacement);
        
     })

     return { getBoardItems };
})();

const gameHandler = (() => {
    const checkRowForWin = (row) => {
        let rowCount = 0;
        gameBoard.getBoard()[row].forEach( item => {
            if (item === 'X') {
                rowCount++;
                if(rowCount >= 3) {
                    return true;
                }
            }
        })
    } 

    const checkColForWin = (col) => {
        let colCount = 0;
        for (let i = 0; i < 3 ; i++) {
            if(gameBoard.getBoard()[i][col] === 'X'){
                 colCount++;
                 if (colCount >= 3){
                     return true;
                     
                 }
            } 
         }
    }

    const checkTopDiagForWin = () => {
        let x = 0;
        let y = 0;
        let diagCount = 0;
      

        for(let i = 0; i < 3; i++) {
            
            if(gameBoard.getBoard()[y][x] == 'X') {
                diagCount++;
                if (diagCount >= 3) {
                    return true;
                }
            }
            x++;
            y++;
        }
    }

    const checkBottomDiagForWin = () => {
        let x = 0;
        let y = 2;
        let diagCount = 0;

        for(let i = 0; i < 3; i++) {
            
            if(gameBoard.getBoard()[y][x] == 'X') {
                diagCount++;
                if (diagCount >= 3) {
                    return true;
                }
            }
            x++;
            y--;
        }
    }

    

    const checkForWin = (row, col) => {
       
        checkRowForWin(row);
        checkColForWin(col);
        checkTopDiagForWin();
        checkBottomDiagForWin();
    }

    return { checkForWin };
})(); 

gameBoard.renderBoard();
