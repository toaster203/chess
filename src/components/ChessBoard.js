import './ChessBoard.css';
import {useEffect, useRef, useState} from 'react';
import figures from '../images/figures.png'

var image = new Image();
image.src = figures;


const ChessBoard = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);


    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        setIsDrawing(true);
        nativeEvent.preventDefault();
    };

    const draw = ({nativeEvent}) => {
        if(!isDrawing) {
           return;
       }        
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        nativeEvent.preventDefault();
    };

    const stopDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            context.lineCap = "round";
            context.strokeStyle = "black";
            context.lineWidth = 5;
            contextRef.current = context;
            contextRef.current.drawImage(image,0,0, 56, 60, 25,25, 56,60) 
            contextRef.current.drawImage(image,0,60, 56, 60,25,425, 56,60) 
            console.log("drawing figures.")
    
        }, 500)
        return () => clearInterval(timer)
      },[])
    
    return (
        <div>
            <canvas className="canvas-container"
                width={504}
                height={504}
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                >
            </canvas>
        </div>
    )
}

export default ChessBoard;