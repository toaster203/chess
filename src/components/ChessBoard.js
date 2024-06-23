import './ChessBoard.css';
import {useEffect, useRef, useState} from 'react';
import figures from '../images/figures.png'
import { initChessPieces } from './ChessPiece'; 
var image = new Image();
image.src = figures;

const WHITEPIECE = 1
const BLACKPIECE = 0
const PIECEWIDTH = 56
const PIECEHIGHT = 60
const XOFFSET =28
const ChessBoard = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [whitePieces, setWhitePieces] = useState(initChessPieces(WHITEPIECE))
    const [blackPieces, setBlackPieces] = useState(initChessPieces(BLACKPIECE))
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        contextRef.current = context;
        whitePieces.forEach( piece=>{
            drawPiece(piece)
        })
        blackPieces.forEach( piece=>{
            drawPiece(piece)
        })
    },[])

    const drawPiece = (piece) =>{
        const figureX = piece.figurePosition * PIECEWIDTH
        const figureY = piece.color * PIECEHIGHT
        const x = piece.x * PIECEWIDTH + XOFFSET
        const y = piece.y * PIECEWIDTH + XOFFSET
        contextRef.current.drawImage(image,
            figureX,
            figureY,
            PIECEWIDTH,
            PIECEHIGHT,
            x,
            y,
            PIECEWIDTH,
            PIECEHIGHT) 
    }

    return (
        <div>
            <canvas className="canvas-container"
                width={504}
                height={504}
                ref={canvasRef}
                >
            </canvas>
        </div>
    )
}

export default ChessBoard;