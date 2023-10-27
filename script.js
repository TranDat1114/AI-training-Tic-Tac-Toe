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

// Lamf mới bàn cờ
function resetBoard() {
    board.innerHTML = '';
    currentNode.addChild(new GameTreeNode(initialBoard, firstPlayer));
}

// Tạo nước đi
function makeMove(event) {
    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    // Kiểm tra ô còn trống không
    if (!cell.textContent) {
        // Đánh dấu ô
        cell.textContent = currentNode.player;

        // Cập nhật bàn cờ
        let newBoard = currentNode.board.map((row) => [...row]);
        newBoard[row][col] = currentNode.player;

        // Tạo nút con cho nút hiện tại
        currentNode.addChild(new GameTreeNode(newBoard, currentNode.player));
        console.log(newBoard)

        // Chuyển node hiện tại thành nút con vừa tạo
        currentNode = currentNode.children[0];

        // Kiểm tra điều kiện thắng
        const winner = checkWin(currentNode.board, currentNode.player, Number(row), Number(col));
        console.log(winner)

        // Trả về người chơi chiến thắng và làm mới trò chơi
        if (winner) {
            alert(`Player ${currentNode.player} wins!`);
            resetBoard();
            createBoard();
        }
        // Chuyển lượt chơi
        currentNode.player = currentNode.player === 'X' ? 'O' : 'X';
    }
}

// Chuẩn bị biến trò chơi

// lấy bàn cờ từ web
const board = document.getElementById('board');
const boardSize = 10;
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
    ["", "", "", "", "", "", "", "", "", ""],
];

const rootNode = new GameTreeNode(initialBoard, currentPlayer);
let currentNode = rootNode;


// Bắt đầu game ở đây
createBoard();

// Phần này để làm ai cho trò chơi -- tương lai
// Tạo trò chơi bằng cách thêm các nút con cho nút gốc
// generateChildNodes(rootNode); 
