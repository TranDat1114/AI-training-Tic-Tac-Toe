// Test case 1: Clicking on an empty cell should mark it with the current player's symbol
const cell1 = { dataset: { row: 0, col: 0 }, textContent: '' };
const currentNode1 = { player: 'X', board: [['', '', ''], ['', '', ''], ['', '', '']], children: [] };
const emptyCellsCount1 = 9;
makeMove({ target: cell1 }, currentNode1, emptyCellsCount1);
console.assert(cell1.textContent === 'X', 'Test case 1 failed');
console.log('Test case 1 passed');

// Test case 2: Clicking on a non-empty cell should not mark it and should not change the current player
const cell2 = { dataset: { row: 1, col: 1 }, textContent: 'O' };
const currentNode2 = { player: 'O', board: [['X', '', ''], ['', 'O', ''], ['', '', '']], children: [] };
const emptyCellsCount2 = 6;
makeMove({ target: cell2 }, currentNode2, emptyCellsCount2);
console.assert(cell2.textContent === 'O', 'Test case 2 failed');
console.assert(currentNode2.player === 'O', 'Test case 2 failed');
console.log('Test case 2 passed');
// Test case 3: Clicking on an empty cell should add a new child node to the current node
const cell3 = { dataset: { row: 2, col: 1 }, textContent: '' };
const currentNode3 = { player: 'O', board: [['X', '', ''], ['', 'O', ''], ['', '', '']], children: [] };
const emptyCellsCount3 = 5;
makeMove({ target: cell3 }, currentNode3, emptyCellsCount3);
console.assert(currentNode3.children.length === 1, 'Test case 3 failed');
console.log('Test case 3 passed');

// Test case 4: Clicking on an empty cell should update the board of the new child node
const cell4 = { dataset: { row: 1, col: 0 }, textContent: '' };
const currentNode4 = { player: 'X', board: [['X', '', ''], ['', 'O', ''], ['', '', '']], children: [] };
const emptyCellsCount4 = 4;
makeMove({ target: cell4 }, currentNode4, emptyCellsCount4);
console.assert(currentNode4.children[0].board[1][0] === 'X', 'Test case 4 failed');
console.log('Test case 4 passed');

// Test case 5: Clicking on an empty cell should switch the player of the new child node
const cell5 = { dataset: { row: 2, col: 2 }, textContent: '' };
const currentNode5 = { player: 'O', board: [['X', '', ''], ['', 'O', ''], ['', '', '']], children: [] };
const emptyCellsCount5 = 5;
makeMove({ target: cell5 }, currentNode5, emptyCellsCount5);
console.assert(currentNode5.children[0].player === 'X', 'Test case 5 failed');
console.log('Test case 5 passed');

// Test case 6: Clicking on a cell that is already marked should not add a new child node
const cell6 = { dataset: { row: 0, col: 0 }, textContent: 'X' };
const currentNode6 = { player: 'O', board: [['X', '', ''], ['', 'O', ''], ['', '', '']], children: [] };
const emptyCellsCount6 = 5;
makeMove({ target: cell6 }, currentNode6, emptyCellsCount6);
console.assert(currentNode6.children.length === 0, 'Test case 6 failed');
console.log('Test case 6 passed');

// Test case 7: Clicking on a cell that is already marked should not update the board of the current node
const cell7 = { dataset: { row: 1, col: 1 }, textContent: 'O' };
const currentNode7 = { player: 'X', board: [['X', '', ''], ['', 'O', ''], ['', '', '']], children: [] };
const emptyCellsCount7 = 4;
makeMove({ target: cell7 }, currentNode7, emptyCellsCount7);
console.assert(currentNode7.board[1][1] === 'O', 'Test case 7 failed');
console.log('Test case 7 passed');

// Test case 8: Clicking on a cell that is already marked should not switch the player of the current node
const cell8 = { dataset: { row: 2, col: 0 }, textContent: 'X' };
const currentNode8 = { player: 'O', board: [['X', '', ''], ['', 'O', ''], ['X', '', '']], children: [] };
const emptyCellsCount8 = 4;
makeMove({ target: cell8 }, currentNode8, emptyCellsCount8);
console.assert(currentNode8.player === 'O', 'Test case 8 failed');
console.log('Test case 8 passed');

// Test case 9: Clicking on the last empty cell should call restartOrSee with no winner
const cell9 = { dataset: { row: 2, col: 1 }, textContent: '' };
const currentNode9 = { player: 'X', board: [['X', 'O', 'X'], ['O', 'O', 'X'], ['X', 'X', 'O']], children: [] };
const emptyCellsCount9 = 1;
let winner9 = null;
const restartOrSee9 = (winner) => { winner9 = winner; };
makeMove({ target: cell9 }, currentNode9, emptyCellsCount9, restartOrSee9);
console.assert(winner9 === null, 'Test case 9 failed');
console.log('Test case 9 passed');

// Test case 10: Clicking on a cell that leads to a win should call restartOrSee with the winning player
const cell10 = { dataset: { row: 1, col: 2 }, textContent: '' };
const currentNode10 = { player: 'X', board: [['X', 'O', 'X'], ['O', 'O', ''], ['X', '', '']], children: [] };
const emptyCellsCount10 = 2;
let winner10 = null;
const restartOrSee10 = (winner) => { winner10 = winner; };
makeMove({ target: cell10 }, currentNode10, emptyCellsCount10, restartOrSee10);
console.assert(winner10 === 'O', 'Test case 10 failed');
console.log('Test case 10 passed');