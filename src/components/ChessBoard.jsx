import './ChessBoard.css';
import {useEffect, useRef, useState} from 'react';
import figures from '../images/figures.png'
import { initChessPieces } from './ChessPiece'; 
import getPieceAt from '../utils/getPieceAt';
import { getValidMoves } from '../utils/getValidMoves';

let image = new Image();
image.src = figures;

const WHITEPIECE = 1;
const BLACKPIECE = 0;
const PIECEWIDTH = 56;
const PIECEHEIGHT = 56;
const XOFFSET = 28
const YOFFSET = 28;

const ChessBoard = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [whitePieces, setWhitePieces] = useState(initChessPieces(WHITEPIECE))
    const [blackPieces, setBlackPieces] = useState(initChessPieces(BLACKPIECE))
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [validMoves, setValidMoves] = useState([]);
    const [currentTurn, setCurrentTurn] = useState(WHITEPIECE);

    // draw board on start
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        contextRef.current = context;
        image.onload = () => {
            drawBoard(whitePieces, blackPieces);
        }
    },[whitePieces, blackPieces]);

    // draw board on piece move / selection
    useEffect(() => {
        if (contextRef) {
            drawBoard(whitePieces, blackPieces);
        }
    }, [whitePieces, blackPieces, selectedPiece]);

    const drawBoard = (whitePieces, blackPieces) => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // clear old selections
        let isSelected = false;
        const allPieces = whitePieces.concat(blackPieces);
        
        validMoves.forEach(move => {
            contextRef.current.fillStyle = 'rgba(0, 255, 0, 0.5)';
            contextRef.current.fillRect(move.x * PIECEWIDTH + XOFFSET, move.y * PIECEWIDTH + XOFFSET, PIECEWIDTH, PIECEHEIGHT);
        })

        allPieces.forEach(piece=> {
            isSelected = false;
            if (piece === selectedPiece) {
                isSelected = true;
            }
            drawPiece(piece, isSelected);
        })

        
    };

    // determine mouse position
    const getMousePos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX -  rect.left - XOFFSET;
        const mouseY = e.clientY - rect.top - YOFFSET;
        const snapX = Math.floor(mouseX / PIECEWIDTH);
        const snapY = Math.floor(mouseY / PIECEHEIGHT);

        return {snapX, snapY};
    }

    // handle clicking pieces
    const handleMouseDown = (e) => {
        const {snapX, snapY} = getMousePos(e);

        let piece = getPieceAt(snapX, snapY, whitePieces, blackPieces);
        if (!selectedPiece) { // select piece
            if (piece && piece.color === currentTurn) {
                setSelectedPiece(piece); 
                setValidMoves(getValidMoves(piece, whitePieces, blackPieces));
            }
        } else { // select square
            const isValidMove = validMoves.find(move => (move.x === snapX && move.y === snapY));
            if (isValidMove) {
                selectedPiece.x = snapX;
                selectedPiece.y = snapY;

                if (piece && (piece.color !== selectedPiece.color)) { // if capturing opponent piece
                    if (piece.color === WHITEPIECE) {
                        setWhitePieces(whitePieces.filter(p => p !== piece));
                    } else {
                        setBlackPieces(blackPieces.filter(p => p !== piece));
                    }
                }
                setCurrentTurn(currentTurn === WHITEPIECE ? BLACKPIECE : WHITEPIECE);
            }
            setValidMoves([]);
            setSelectedPiece(null);
        }
    }

    
    // draw piece on board
    const drawPiece = (piece, isSelected) =>{
        const figureX = piece.figurePosition * PIECEWIDTH;
        const figureY = piece.color * PIECEHEIGHT;
        const x = piece.x * PIECEWIDTH + XOFFSET;
        const y = piece.y * PIECEWIDTH + YOFFSET;

        if (isSelected) {
            contextRef.current.fillStyle = 'rgba(255, 255, 0, 0.5)';
            contextRef.current.fillRect(x, y, PIECEWIDTH, PIECEHEIGHT);
        }

        contextRef.current.drawImage(image,
            figureX,
            figureY,
            PIECEWIDTH,
            PIECEHEIGHT,
            x,
            y,
            PIECEWIDTH,
            PIECEHEIGHT) 
    }

    return (
        <div className="wrapper">
            <div className="board">
                <div className="info-container">
                    <div>Current turn:</div>
                    <div className="to-move" style={{ backgroundColor: (currentTurn === WHITEPIECE ? "white" : "black") }}/>
                </div>
                <canvas className="canvas-container"
                    width={504}
                    height={504}
                    onMouseDown={handleMouseDown}
                    ref={canvasRef}
                    >
                </canvas>
                
            </div>
        </div>
    )
}

export default ChessBoard;