import { useState } from "react";
import './display.css';



function DisplayGraph(props){

    const [borderColor, setBorderColor] = useState("black")
    const [miniData, setMiniData] = useState(0)

    function handleMouseDown(e, cell, row, column){
        e.preventDefault()
        console.log(cell, row, column)
    } 

    function handleMouseUp(e, cell, row, column){
        e.preventDefault()
        console.log("released", cell, row, column)
    }

    return (
        <div 
            className="gridContainer"
        >
            Graph - from DISPLAY {props.data.columnSize}
            <div
                className="flex-container"
            >
                {props.data.grid.map((row, rowIndex)=>{
                    return(
                        <div key={rowIndex}
                        className="flex-item"
                        >
                            {row.map((cell, cellIndex)=>{
                                return(
                                    <div key={cellIndex}
                                        onMouseDown={(e)=>{
                                            handleMouseDown(e, cell, rowIndex, cellIndex)
                                        }}
                                        onMouseUp={(e)=>{
                                            handleMouseUp(e, cell, rowIndex, cellIndex)
                                        }}
                                    >
                                        {cell}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default DisplayGraph;