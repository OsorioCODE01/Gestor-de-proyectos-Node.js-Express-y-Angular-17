function moveArrayItems(from, to, array){
    let elementToMove = array.splice(from, 1)[0];
    // Calculamos la nueva posición en la que deseamos insertar el elemento 
    //teniendo en cuenta como se altera el array al extraer el elemento a mover
    let newPosition = to < 0 ? 0 : to > array.length ? array.length : to;
    array.splice(newPosition, 0, elementToMove);
    return array;
}


function ActToOtherCol(actFrom, actTo, arrayFrom, arrayTo, array){
    let elementToMove = array[arrayFrom].column_content.splice(actFrom, 1)[0];
    let newPosition = actTo < 0 ? 0 : actTo > array[arrayTo].column_content.length ? array[arrayTo].column_content.length : actTo;
    array[arrayTo].column_content.splice(newPosition, 0, elementToMove);
    return array;
}

module.exports = {
    moveArrayItems,
    ActToOtherCol
}