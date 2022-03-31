import { useState } from "react";
import './display.css';



function DisplayGraph(props){
/* 
    const [borderColor, setBorderColor] = useState("black") */
    const [miniData, setMiniData] = useState({
        content: "*",
        row: 0,
        column: 0
    })

    function handleMouseDown(e, cell, row, column){
        e.preventDefault()
        let temp = {
            content: cell,
            row: row,
            column: column
        }
        setMiniData(temp)
    } 

    function handleMouseUp(e, cell, row, column){
        e.preventDefault()
        //console.log("released", cell, row, column)
        let temp = {
            content: cell,
            row: row,
            column: column
        }
        props.swap(miniData, temp);
    }

    function handleBlock(e, cell, row, column){
        e.preventDefault()
        if(!(cell=="A" || cell=="B")){
            if(cell >= 0){
                props.updateCell(-1, row, column)
            } else {
                props.updateCell(0, row, column)
            }
        }
    }

    return (
        <div 
            className="gridContainer"
        >
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
                                        onClick={(e)=>{
                                            handleBlock(e, cell, rowIndex, cellIndex)
                                        }}

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