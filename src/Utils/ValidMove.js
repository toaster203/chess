export const validMove = (piece, wPieces, bPieces)=>{
    if(piece.name === 'pawn'){
        return validPawnMove(piece,wPieces,bPieces)
    }
}

const validPawnMove = (piece, wPieces, bPieces)=>{
    let validPositions = []
    if(piece.y == 0){
        // return queens move
    }
    let p1 = {
        x: piece.x,
        y: piece.y -1
    }
    if(!wPieces.find((p)=> p.x == p1.x && p.y == p1.y) &&
       !bPieces.find((p)=> p.x == p1.x && p.y == p1.y))
        validPositions.push({...p1})
    if(piece.x > 0){
        p1.x = piece.x - 1
        if(bPieces.find((p)=> p.x == p1.x && p.y == p1.y))
            validPositions.push({...p1})
    }
    if(piece.x <7 ){
        p1.x = piece.x + 1
        if(bPieces.find((p)=> p.x == p1.x && p.y == p1.y))
            validPositions.push({...p1})
    }
    if(piece.y == 6 ){
        p1.x = piece.x
        p1.y = piece.y-2
        if(!wPieces.find((p)=> p.x == p1.x && p.y == p1.y) &&
        !bPieces.find((p)=> p.x == p1.x && p.y == p1.y))
            validPositions.push({...p1})
    }
    return validPositions
}