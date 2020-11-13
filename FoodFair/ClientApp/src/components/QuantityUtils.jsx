export const getQuantityString = (singleStockQuantity, quantityUnit) => {
    if (singleStockQuantity === 1) {
        return quantityUnit;
    }

    let quantityString = singleStockQuantity + " ";
    quantityString += getQuantityUnit(quantityUnit);
    return quantityString;
}

const getQuantityUnit = (quantityUnit) => {
    return quantityUnit === "Piece" ? "Pieces" : quantityUnit;
}