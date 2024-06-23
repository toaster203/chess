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
    }
    let rook1 = {...rook}
    rook1.x=7
    const knight = {
        color,
        x:1,
        y:color*7,
        figurePosition:1,
    }
    let knight1 = {...knight}
    knight1.x = 6
    const bishop = {
        color,
        x:2,
        y:color*7,
        figurePosition:2,
    }
    let bishop1 = {...bishop}
    bishop1.x = 5
    const queen = {
        color,
        x:3,
        y:color*7,
        figurePosition:3,
    }
    const king = {
        color,
        x:4,
        y:color*7,
        figurePosition:4,
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
        }
        pieces.push(pawn)
    }
    return pieces
}