import { useState } from "react";




function ControlButtons(props){
    const [size, setSize] = useState(3);
    const [msg, setmsg] = useState("Graph size min - max: 2 - 20")

    function handleSize(e){
        setSize(e.target.value)
        console.log(e.target.value)
        if (e.target.value < 21){
            props.update(parseInt(e.target.value))
        }
    }

    return (
        <div>
            <div>
                Control Buttons
                <input type="text" onChange={handleSize} placeholder={" Current " + size}></input>
                <button onClick={props.displayGrid}>Display </button>
            </div>
            <div>
                {msg}
            </div>
        </div>
    );
}

export default ControlButtons;