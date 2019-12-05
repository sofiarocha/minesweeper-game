import React from "react";

const Cell = ({ value, onClickCell }) => {
    const displayCellValue = () => {
        if (!value.isClicked) return null;
        if (value.isMine) {
            return (
                <span role="img" aria-labelledby="bomb">
                    💣
                </span>
            );
        }
        if (value.neighbour !== 0) {
            return <span>{value.neighbour}</span>;
        }
    };
    return (
        <div
            className={value.isClicked ? "cell active" : "cell"}
            onClick={() => onClickCell(value)}
            role="presentation"
        >
            {displayCellValue()}
        </div>
    );
};

export default Cell;
