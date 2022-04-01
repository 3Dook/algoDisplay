import { useState } from "react";




function ControlButtons(props){
    const [size, setSize] = useState(2);
    const [msg, setmsg] = useState("Graph size min - max: 2 - 20")

    function handleSize(e){
        if(msgHandler(e.target.value)){
            setmsg("")
            setSize(e.target.value)
            props.update(parseInt(e.target.value))     
            props.displayGrid()
        }
        props.displayGrid()
    }

    function isNumber(input){
        return !isNaN(parseFloat(input)) && !isNaN(input - 0);
    }
    
    function msgHandler(input){
        if(isNumber(input)){
            // more error checks
            if(input < 2){
                setmsg("Number too low")
                return false
            }
            else if(input > 20){
                setmsg("Number too high")
                return false
            }
            
            return true;
        }
        else {
            setmsg("Not Valid Numeric Input")
            return false;
        }
    }

    return (
        <div>
            <div>
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