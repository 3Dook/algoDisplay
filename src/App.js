import { useState, useEffect } from 'react';
import './App.css';
import DisplayGraph from './components/displayGraph';
import ControlButtons from './components/controlButtons';

function App() {

  const [data, setData] = useState({
    columnSize: 2,
    rowSize: 2,
    start: {
      symbol: 'A',
      column: 0,
      row: 0,
    },
    end: {
      symbol: 'B',
      column: 1,
      row: 0,
    },
    grid: [["A","B"],[0,0]]
  })

  function handleUpdate(newSize){
    setData((prevState) => ({
      ...prevState,
      columnSize: newSize,
    }));
  };

  function handleCellUpdate(newCell, row, column){
    // checkign 
    if(newCell == "A"){
      data.start.row = row;
      data.start.column = column;
    }

    if(newCell == "B"){
      data.end.row = row;
      data.end.column = column;
    }


    data.grid[row][column] = newCell

    setData((prevState) => ({
      ...prevState,
      grid: [...data.grid],
      start: data.start,
      end: data.end
    }));    
  }

  function updateGrid(){
    // check to see if we need to increase or decrease grid 
    // check to see if we need to move the start and end button

    if(data.columnSize >= data.grid.length){
      //increase
      let temp = data.columnSize - data.grid.length
      const columnLength = data.grid.length
      // add the row
      for (let i=0; i < temp; i++){
        data.grid.push(new Array(columnLength).fill(0))
      }

      for (let i=0; i < data.columnSize; i++){
          for (let j=0; j < temp; j++){
            data.grid[i].push(0)
          }
      }
    } else {
      //Decrease 
      // need to check if start and finish is at those spots and shift accordingly
      let temp =  data.grid.length - data.columnSize;

      // 
      if(data.end.row > data.columnSize - 1){
        let newRow = data.end.row - (data.end.row - data.columnSize) - 1
        handleCellUpdate("B", newRow, data.end.column )
      }

      if(data.end.column > data.columnSize - 1){
        let newColumn = data.end.column - (data.end.column - data.columnSize) - 1
        handleCellUpdate("B", data.end.row, newColumn )
      } 
      console.log(data.start.column)

      if(data.start.row > data.columnSize - 1){
        let newRow = data.start.row - (data.start.row - data.columnSize) - 1
        handleCellUpdate("A", newRow, data.start.column)
      }

      if(data.start.column > data.columnSize - 1){
        let newColumn = data.start.column - (data.start.column - data.columnSize) - 1
        if (data.grid[data.start.row][newColumn] == "B"){
          handleCellUpdate("A", data.start.row, newColumn - 1)
        } else {
          handleCellUpdate("A", data.start.row, newColumn )
        }
      }


      for (let i=0; i < temp; i++){
        data.grid.pop()
      }

      for (let i=0; i < data.columnSize; i++){
          for (let j=0; j < temp; j++){
            data.grid[i].pop()
          }
      }
    }
    setData((prevState) => ({
      ...prevState,
      grid: [...data.grid],
    }));    
  }

  function swapPosition(cellOne, cellTwo){
    handleCellUpdate(cellOne.content, cellTwo.row, cellTwo.column)
    handleCellUpdate(cellTwo.content, cellOne.row, cellOne.column)
    updateGrid()
  }



  useEffect(()=>{
    updateGrid()
  }, [])

  return (
    <div className="App">
      <div className='appHeader'><h1>DDD ALGORITHM VISUALIZER</h1></div>
      <ControlButtons className='appControl'update={handleUpdate} displayGrid={updateGrid}/>
      <DisplayGraph className='appDisplay' data={data} swap={swapPosition} updateCell={handleCellUpdate}/>
    </div>
  );
}

export default App;
