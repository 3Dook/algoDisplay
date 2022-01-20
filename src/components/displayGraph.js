import { useState } from "react";




function DisplayGraph(props){


    return (
        <div>
            Graph - from DISPLAY
            {props.data.columnSize}
            <div>
                {props.data.grid.map((row, rowIndex)=>{
                    return(
                        <div key={rowIndex}>
                            {row}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default DisplayGraph;