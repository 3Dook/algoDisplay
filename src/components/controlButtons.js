import { useState } from "react";




function ControlButtons(props){


    return (
        <div>
            Control Buttons
            <button onClick={props.update}>change to 20</button>
            <button onClick={props.displayGrid}>Display </button>
        </div>
    );
}

export default ControlButtons;