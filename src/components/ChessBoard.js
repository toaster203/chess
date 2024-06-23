import './ChessBoard.css';
import {useEffect, useRef, useState} from 'react';
import figures from '../images/figures.png'
import { initChessPieces,getPiece } from './ChessPiece'; 
var image = new Image();
image.src = figures;

const WHITEPIECE = 1
const BLACKPIECE = 0
const PIECEWIDTH = 56
const PIECEHIGHT = 60
const XOFFSET =28
const MARGIN_LEFT = 20
const MARGIN_TOP = 50
var selectedPiece = null

const ChessBoard = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [whitePieces, setWhitePieces] = useState(initChessPieces(WHITEPIECE))
    const [blackPieces, setBlackPieces] = useState(initChessPieces(BLACKPIECE))
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        contextRef.current = context;
        draw(blackPieces, whitePieces)
    },[])

    const draw = (wPieces, bPieces)=>{
        contextRef.current.clearRect(0, 0, canvasRef.current.width
            , canvasRef.current.height);
        wPieces.forEach( piece=>{
            drawPiece(piece)
        })
        bPieces.forEach( piece=>{
            drawPiece(piece)
        })
    }

    const drawPiece = (piece) =>{
        const figureX = piece.figurePosition * PIECEWIDTH
        const figureY = piece.color * PIECEHIGHT
        const x = piece.x * PIECEWIDTH + XOFFSET
        const y = piece.y * PIECEWIDTH + XOFFSET
        if(!piece.selected){
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
        else{
            contextRef.current.drawImage(image,
                figureX,
                figureY,
                PIECEWIDTH,
                PIECEHIGHT,
                piece.draggingX - MARGIN_LEFT ,
                piece.draggingY - MARGIN_TOP,
                PIECEWIDTH,
                PIECEHIGHT) 
        }
    }
    const movePiece = (x,y) =>{
        if(selectedPiece!==null && selectedPiece!==undefined){
            selectedPiece.draggingX = x - PIECEWIDTH/2 
            selectedPiece.draggingY = y - PIECEWIDTH/2 
            setWhitePieces([...whitePieces])
            draw(whitePieces, blackPieces)        
        }            
    }
    const onMouseDown = ({nativeEvent}) => {
        let {x,y} = nativeEvent;
        selectedPiece = getPiece(x,y, whitePieces)
        if(selectedPiece!==null && selectedPiece!==undefined){
            selectedPiece.selected= true
            movePiece( x,y)
        }
        nativeEvent.preventDefault();
    };
    const onMouseMove = ({nativeEvent}) => {
        var {x,y} = nativeEvent;
        movePiece(x,y)
        nativeEvent.preventDefault();
    };

    const onMouseUp = ({nativeEvent}) => {
        const {x,y} = nativeEvent;
        if(selectedPiece!==null && selectedPiece!==undefined){
            selectedPiece.selected= false
            movePiece( x,y)
        }
        nativeEvent.preventDefault();
    };
    const onMouseLeave = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        nativeEvent.preventDefault();
    };
    
    return (
        <div>
            <canvas className="canvas-container"
                width={504}
                height={504}
                ref={canvasRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
                >
            </canvas>
        </div>
    )
}

export default ChessBoard;