export var ChessPiece = {
    color: 0,   // black
    x:  0,      // board x position
    y:  0,      // board y position
    figurePosition: 0,   // figure image position
    name: ''   // figure name
}

export const initChessPieces = color =>{
    // create pieces
    // color 0 is black, color 1 is white
    // figure position 
    const rook = {
        color,
        x:0,
        y: color*7,
        figurePosition:0,
        name: 'rook',
    }
    const knight = {
        color,
        x:1,
        y:color*7,
        figurePosition:1,
        name: 'knight',
    }
    const bishop = {
        color,
        x:2,
        y:color*7,
        figurePosition:2,
        name: 'bishop',
    }
    const queen = {
        color,
        x:3,
        y:color*7,
        figurePosition:3,
        name: 'queen',
    }
    const king = {
        color,
        x:4,
        y:color*7,
        figurePosition:4,
        name: 'king',
    }
    // create other rook, bishop, knight placed on other side of board 
    let rook1 = {...rook, x: 7};
    let knight1 = {...knight, x:6};
    let bishop1 = {...bishop, x:5};


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
            name: 'pawn',
        }
        pieces.push(pawn)
    }
    return pieces
}