// determine piece at mouse position
export default function getPieceAt(x, y, whitePieces, blackPieces) {
    const allPieces = whitePieces.concat(blackPieces);
    return allPieces.find(piece => piece.x === x && piece.y === y);
}
