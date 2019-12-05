import React from "react";

import Board from "./Board";

const App = () => {
    return (
        <div>
            <h1>
                Let's play
                <span> Minesweeper</span>
            </h1>
            <Board />
        </div>
    );
};

export default App;
