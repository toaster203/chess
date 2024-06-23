import './ChessBoard.css';
import {useEffect, useRef, useState} from 'react';
import figures from '../images/figures.png'
import { initChessPieces } from './ChessPiece'; 
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
    const [currentPiece, setCurrentPiece] = useState(null);
    const [selectedPiece, setSelectedPiece] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        contextRef.current = context;
        drawBoard(whitePieces, blackPieces);
    },[whitePieces, blackPieces]);

    const drawBoard = (whitePieces, blackPieces) => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        let isSelected = false;
        whitePieces.forEach( piece=>{
            isSelected = false;
            if (piece === selectedPiece) {
                isSelected = true;
                console.log("selected piece", piece);
            }
            drawPiece(piece, isSelected);
        })
        blackPieces.forEach( piece=>{
            isSelected = false;
            if (piece === selectedPiece) {
                isSelected = true;
                //console.log("selected piece", piece);
            }
            drawPiece(piece, isSelected);
        })
    };

    const getMousePos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX -  rect.left - XOFFSET;
        const mouseY = e.clientY - rect.top - YOFFSET;
        const snapX = Math.floor(mouseX / PIECEWIDTH);
        const snapY = Math.floor(mouseY / PIECEHEIGHT);

        return {snapX, snapY};
    }

    const handleMouseMove = (e) =>{
        const {snapX, snapY} = getMousePos(e);
        //console.log(e.clientX, e.clientY, rect.left, rect.top, snapX, snapY)

        let piece = getPieceAt(snapX, snapY);
        if (piece) {
            //console.log(piece);
        }

        setCurrentPiece(piece);
    }

    const handleMouseDown = (e) => {
        console.log("current selected:", selectedPiece);
        if (!selectedPiece) {
            setSelectedPiece(currentPiece);
            console.log("setting selected piece", selectedPiece);
        } else {
            console.log("moving selected piece", selectedPiece);
            const {snapX, snapY} = getMousePos(e);
            selectedPiece.x = snapX;
            selectedPiece.y = snapY;
            console.log("moved to ", selectedPiece.x, selectedPiece.y, " unsetting");
            setSelectedPiece(null);
        }
        

        if (contextRef) drawBoard(whitePieces, blackPieces);
    }

    const getPieceAt = (x, y) =>{
        const allPieces = whitePieces.concat(blackPieces);
        return allPieces.find(piece => piece.x === x && piece.y === y);
    }

    const drawPiece = (piece, isSelected) =>{
        const figureX = piece.figurePosition * PIECEWIDTH;
        const figureY = piece.color * PIECEHEIGHT;
        const x = piece.x * PIECEWIDTH + XOFFSET;
        const y = piece.y * PIECEWIDTH + YOFFSET;

        if (isSelected) {
            contextRef.fillStyle = 'rgba(255, 255, 0, 0.5)';
            contextRef.current.fillRect(x, y, PIECEWIDTH, PIECEHEIGHT);
            console.log("drawing selected");
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
        <div>
            <canvas className="canvas-container"
                width={504}
                height={504}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                ref={canvasRef}
                >
            </canvas>
        </div>
    )
}

export default ChessBoard;