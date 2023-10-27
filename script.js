
// Giai đoạn chuẩn bị

class GameTreeNode {
    constructor(board, player) {
        this.board = board; // Trạng thái của bàn cờ
        this.player = player; // Người chơi hiện tại
        this.children = []; // Các nút con trong cây
    }

    addChild(childNode) {
        this.children.push(childNode);
    }
}

function findLastNode(node) {
    if (node.children.length === 0) {
        return node; // Đây là node cuối cùng
    }

    // Nếu có node con, tiếp tục xuống đến node con đầu tiên
    return findLastNode(node.children[0]);
}

// Chuẩn bị biến trò chơi

// lấy bàn cờ từ web
const board = document.getElementById('board');
const boardSize = 10;
let gameNumber = 0;
let emptyCellsCount = boardSize * boardSize;
// Người chơi hiện tại
const firstPlayer = 'X';

// Tạo nút gốc cho cây trò chơi
const initialBoard = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "X", "", "", "", ""],
];

const rootNode = new GameTreeNode(initialBoard, firstPlayer);
// Tạo bàn cờ
function createBoard() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', makeMove);
            board.appendChild(cell);
        }
    }
}


// Thêm các nút con và xây dựng cây trò chơi
// Ví dụ: Thêm tất cả các nước đi hợp lệ từ trạng thái hiện tại của bàn cờ làm nút con
function generateChildNodes(node) {
    const board = node.board;

    // Chuyển lượt chơi
    const currentPlayer = node.player === "X" ? "O" : "X";

    // Lặp qua tất cả ô trong bàn cờ
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            if (board[row][col] === "") {
                // Tạo một bản sao của bàn cờ và đánh dấu nước đi của người chơi hiện tại
                const newBoard = board.map((row) => [...row]);
                newBoard[row][col] = currentPlayer;

                // Tạo một nút con và thêm nó vào cây
                const childNode = new GameTreeNode(newBoard, currentPlayer);
                node.addChild(childNode);

                // Đệ quy để tạo các nút con cho nút con này (nếu cần)
                generateChildNodes(childNode);
            }
        }
    }
}

// Kiểm tra điều kiện chiến thắng
function checkWin(board, player, row, col) {
    const targetLength = 3;

    return (
        checkHorizontal(board, player, row, col, targetLength) ||
        checkVertical(board, player, row, col, targetLength) ||
        checkDiagonal(board, player, row, col, targetLength)
    );
}

// Kiểm tra hàng ngang
function checkHorizontal(board, player, row, col, targetLength) {

    const numCols = board[0].length;

    let count = 0;
    for (let i = Math.max(0, col - targetLength + 1); i <= Math.min(numCols - 1, col + targetLength - 1); i++) {
        if (board[row][i] === player) {
            count++;
            if (count === targetLength) {
                return true; // Người chơi thắng
            }
        } else {
            count = 0;
        }
    }

    return false;
}

// Kiểm tra hàng dọc nè
function checkVertical(board, player, row, col, targetLength) {

    const numRows = board.length;

    let count = 0;
    for (let i = Math.max(0, row - targetLength + 1); i <= Math.min(numRows - 1, row + targetLength - 1); i++) {
        if (board[i][col] === player) {
            count++;
            if (count === targetLength) {
                return true; // Người chơi thắng
            }
        } else {
            count = 0;
        }
    }

    return false;
}

// Kiểm tra đường chéo
function checkDiagonal(board, player, row, col, targetLength) {
    const numRows = board.length;
    const numCols = board[0].length;

    // Kiểm tra đường chéo chính (phải dưới) và đường chéo phụ (phải trên)
    function checkDiagonalHelper(dx, dy) {
        let count = 0;
        for (let i = -targetLength + 1; i < targetLength; i++) {
            const r = row + i * dx;
            const c = col + i * dy;
            if (r >= 0 && r < numRows && c >= 0 && c < numCols) {
                if (board[r][c] === player) {
                    count++;
                    if (count === targetLength) {
                        return true; // Người chơi thắng
                    }
                } else {
                    count = 0;
                }
            }
        }
        return false;
    }

    return (
        // Đường chéo chính (phải dưới)
        // Đường chéo phụ (phải trên)
        checkDiagonalHelper(1, 1) ||
        checkDiagonalHelper(1, -1)
    );
}

// Hiển thị thông báo hoaf hoặc thắng
const restartOrSee = (winner) => {
    let choice = "";
    // Nếu hòa thì hiện ra 2 lựa chọn restart hoặc xem cây
    if (winner) {
        choice = prompt(`Player wins! Do you want to restart the game or see the game tree? Enter "restart" or "see".`);
    } else {
        choice = prompt(`It's a draw! Do you want to restart the game or see the game tree? Enter "restart" or "see".`);
    }
    if (choice === "restart") {
        resetBoard();
        createBoard();
    } else if (choice === "see") {
        console.log(rootNode)
    } else {
        alert("Invalid choice. Please enter either 'restart' or 'see'.");
        restartOrSee();
    }
}


// Lamf mới bàn cờ
function resetBoard() {
    board.innerHTML = '';
    gameNumber += 1;
    rootNode.addChild(new GameTreeNode(initialBoard, firstPlayer));
}

// Tạo nước đi
/**
 * Handles the logic for making a move in the game.
 * @param {Event} event - The event object for the click event on a game cell.
 */
function makeMove(event) {
    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    // Kiểm tra ô còn trống không
    if (!cell.textContent) {

        // Lấy node hiện tại
        let currentNode = findLastNode(rootNode.children[gameNumber]);

        // Đánh dấu ô
        cell.textContent = currentNode.player;

        // Cập nhật bàn cờ
        let newBoard = currentNode.board.map((row) => [...row]);
        newBoard[row][col] = currentNode.player;

        // Tạo nút con cho nút hiện tại
        currentNode.addChild(new GameTreeNode(newBoard, currentNode.player));

        // Kiểm tra điều kiện thắng
        const winner = checkWin(currentNode.children[0].board, currentNode.children[0].player, Number(row), Number(col));

        // Giảm số ô còn trống
        emptyCellsCount--;

        // Trả về người chơi chiến thắng và làm mới trò chơi
        if (winner) {
            restartOrSee(winner);
        } else if (emptyCellsCount === 0) {
            restartOrSee(winner);
        }
        // Chuyển lượt chơi
        currentNode.children[0].player = currentNode.children[0].player === 'X' ? 'O' : 'X';
    }
}

function renderGameBoard(board) {
    const gameBoard = document.getElementById("board");

    // Xóa nội dung bàn cờ hiện tại
    gameBoard.innerHTML = "";

    // Duyệt qua mảng trạng thái bàn cờ và tạo ô cho từng ô trạng thái
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.textContent = board[row][col]; // Sử dụng trạng thái từ lastNode.board
            gameBoard.appendChild(cell);
        }
    }
}

// Gọi hàm để hiển thị bàn cờ từ lastNode.board



// Bắt đầu game ở đây
createBoard();
rootNode.addChild(new GameTreeNode(initialBoard, firstPlayer));

// Hiển thị bàn cờ theo
// renderGameBoard(findLastNode(rootNode.children[gameNumber]).board);
// Phần này để làm ai cho trò chơi -- tương lai
// Tạo trò chơi bằng cách thêm các nút con cho nút gốc
// generateChildNodes(rootNode); 
