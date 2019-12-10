import React from "react";

const Cell = ({ value, onClickCell, onClickFlag }) => {
    const displayCellValue = () => {
        if (value.isFlag && !value.isClicked) {
            return (
                <span role="img" aria-labelledby="peanut">
                    🥜
                </span>
            );
        }
        if (!value.isClicked) return null;
        if (value.isMine) {
            return (
                <span role="img" aria-labelledby="beer">
                    🍺
                </span>
            );
        }
        if (value.neighbour !== 0) {
            return <span>{value.neighbour}</span>;
        }
        return null;
    };

    return (
        <div
            className={value.isClicked ? "cell active" : "cell"}
            onClick={() => onClickCell(value)}
            onContextMenu={event => onClickFlag(event, value)}
            role="presentation"
        >
            {displayCellValue()}
        </div>
    );
};

export default Cell;
