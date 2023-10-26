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

const board = document.getElementById('board');
const boardSize = 10;
let currentPlayer = 'X';

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
    ["", "", "", "", "", "", "", "", "", ""],
];

const rootNode = new GameTreeNode(initialBoard, currentPlayer);

// Thêm các nút con và xây dựng cây trò chơi
// Ví dụ: Thêm tất cả các nước đi hợp lệ từ trạng thái hiện tại của bàn cờ làm nút con
function generateChildNodes(node) {
    const board = node.board;
    const currentPlayer = node.player === "X" ? "O" : "X"; // Chuyển lượt chơi

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
    return (
        checkHorizontal(board, player, row, col) ||
        checkVertical(board, player, row, col) ||
        checkDiagonal(board, player, row, col)
    );
}

// Kiểm tra hàng ngang
function checkHorizontal(board, player, row, col) {

    const numCols = board[0].length;
    const targetLength = 5;

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
function checkVertical(board, player, row, col) {

    const numRows = board.length;
    const targetLength = 5;

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
function checkDiagonal(board, player, row, col) {
    const numRows = board.length;
    const numCols = board[0].length;
    const targetLength = 5;

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
        checkDiagonalHelper(1, 1) || // Đường chéo chính (phải dưới)
        checkDiagonalHelper(1, -1) // Đường chéo phụ (phải trên)
    );
}

// Lamf mới bàn cờ
function resetBoard() {
    moves = [];
    currentPlayer = "X";
    board.innerHTML = '';

}

// Tạo nước đi
function makeMove(event) {
    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    if (!cell.textContent) {
        cell.textContent = currentPlayer;
        moves.push({ row, col, player: currentPlayer });


        console.log(winner)
        if (winner) {
            alert(`Player ${currentPlayer} wins!`);
            resetBoard();
            createBoard();
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}


// Bắt đầu game ở đây
generateChildNodes(rootNode);
createBoard();
