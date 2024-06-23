import MovePatterns from './MovePatterns';
import getPieceAt from './getPieceAt';

const WHITEPIECE = 1;
const BLACKPIECE = 0;

export const getValidMoves = (piece, whitePieces, blackPieces) => {
    const validMoves = [];
    const possibleMoves = MovePatterns[piece.name];
    

    const checkMoveOnce = (x, y) => {
        const targetPiece = getPieceAt(x, y, whitePieces, blackPieces);
        if (x >= 0 && x < 8 && y >= 0 && y < 8) {
            // determine if target square is empty or has opponent piece 
            if (!targetPiece || targetPiece.color !== piece.color) {
                validMoves.push({ x, y });
            }
        }
    }

    const checkMoveContinuous = (moveX, moveY, dx, dy) => {
        // determine if target square is empty or has opponent piece
        while (moveX >= 0 && moveX < 8 && moveY >= 0 && moveY < 8) {
            const targetPiece = getPieceAt(moveX, moveY, whitePieces, blackPieces);
            if (!targetPiece) {
                validMoves.push({ x: moveX, y: moveY });
            } else if (targetPiece.color !== piece.color) {
                validMoves.push({ x: moveX, y: moveY });
                break;
            } else {
                break;
            }
            moveX += dx;
            moveY += dy;
        }
        
    }

    if (piece.name === 'pawn') {
        if (piece.color === WHITEPIECE) {
            if (piece.y === 6) {
                let moveX = piece.x;
                let moveY = piece.y - 2;
                checkMoveOnce(moveX, moveY);
            }
            const left = getPieceAt(piece.x - 1, piece.y - 1, whitePieces, blackPieces);
            const right = getPieceAt(piece.x + 1, piece.y - 1, whitePieces, blackPieces);
            const front = getPieceAt(piece.x, piece.y - 1, whitePieces, blackPieces);

            if (!front) {
                checkMoveOnce(piece.x, piece.y - 1);
            }
            if (right) {
                checkMoveOnce(piece.x + 1, piece.y - 1);
            }
            if (left) {
                checkMoveOnce(piece.x - 1, piece.y - 1);
            }
        } else {
            if (piece.y === 1) {
                let moveX = piece.x;
                let moveY = piece.y + 2;
                checkMoveOnce(moveX, moveY);
            }
            const left = getPieceAt(piece.x - 1, piece.y + 1, whitePieces, blackPieces);
            const right = getPieceAt(piece.x + 1, piece.y + 1, whitePieces, blackPieces);
            const front = getPieceAt(piece.x, piece.y + 1, whitePieces, blackPieces);

            if (!front) {
                checkMoveOnce(piece.x, piece.y + 1);
            }
            if (right) {
                checkMoveOnce(piece.x + 1, piece.y + 1);
            }
            if (left) {
                checkMoveOnce(piece.x - 1, piece.y + 1);
            }
        }
    } else {
        possibleMoves.forEach(([x, y]) => {
            let moveX = piece.x + x;
            let moveY = piece.y + y;

            if (piece.name === 'knight' || piece.name === 'king') {
                checkMoveOnce(moveX, moveY);
            } else {
                checkMoveContinuous(moveX, moveY, x, y);
            }   
            
        })
    }

    return validMoves;
}
