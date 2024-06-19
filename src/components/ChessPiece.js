const PIECEWIDTH = 56
const PIECEHIGHT = 60
const XOFFSET =28
const MARGIN_LEFT = 20
const MARGIN_TOP = 50

export var ChessPiece = {
    color: 0,   // black
    x:  0,      // board x position
    y:  0,      // board y position
    figurePosition: 0   // figure image position
}

export const initChessPieces = color =>{
    const rook = {
        color,
        x:0,
        y: color*7,
        figurePosition:0,
        name:"rook",
        selected: false
    }
    let rook1 = {...rook}
    rook1.x=7
    const knight = {
        color,
        x:1,
        y:color*7,
        figurePosition:1,
        name:"knight",
        selected: false

    }
    let knight1 = {...knight}
    knight1.x = 6
    const bishop = {
        color,
        x:2,
        y:color*7,
        figurePosition:2,
        name:"bishop",
        selected: false

    }
    let bishop1 = {...bishop}
    bishop1.x = 5
    const queen = {
        color,
        x:3,
        y:color*7,
        figurePosition:3,
        name:"queen",
        selected: false

    }
    const king = {
        color,
        x:4,
        y:color*7,
        figurePosition:4,
        name:"king",
        selected: false

    }
    let pieces = []
    pieces.push(rook)
    pieces.push(knight)
    pieces.push(bishop)
    pieces.push(queen)
    pieces.push(king)
    pieces.push(bishop1)
    pieces.push(knight1)
    pieces.push(rook1)
    for(let i=0;i<8; i+=1){
        const pawn = {
            color,
            x: i,
            y: color ? 6: 1,
            figurePosition:5,
            name:"pawn",
            selected: false
        }
        pieces.push(pawn)
    }
    return pieces
}

export const getPiece = (x,y, pieces) =>{
    if(pieces === undefined) return null
    return pieces.find( function (piece){
        const px = piece.x * PIECEWIDTH + XOFFSET 
        const py = piece.y * PIECEWIDTH + XOFFSET
        return  (x - MARGIN_LEFT > px && 
                 x - MARGIN_LEFT < px +  PIECEWIDTH && 
                 y - MARGIN_TOP> py && 
                 y - MARGIN_TOP < py +PIECEHIGHT)
    })
}

