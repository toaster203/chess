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

    const onMouseDown = ({nativeEvent}) => {
        let {x,y} = nativeEvent;
        x -= MARGIN_LEFT
        y -= MARGIN_TOP
        console.log(x,y)
        console.log(whitePieces)
        
        const piece = getPiece(x,y, whitePieces)
        console.log(piece)
        if(piece!==null){
            var newPieces = whitePieces.filter((p)=>{
                return p!==piece
            })  
            setWhitePieces(newPieces)
            console.log(newPieces)
            console.log(whitePieces)
            contextRef.current.clearRect(0, 0, 504, 504);
            draw(newPieces, blackPieces)        
        }
        
        nativeEvent.preventDefault();
    };
    const onMouseMove = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        nativeEvent.preventDefault();
    };

    const onMouseUp = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        nativeEvent.preventDefault();
    };

    const onMouseLeave = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        nativeEvent.preventDefault();
    };
/*
    useEffect(() => {
        const timer = setInterval(() => {
        }, 300)
        return () => clearInterval(timer)
      }, [])
*/    

    
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