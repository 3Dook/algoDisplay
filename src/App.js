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
    grid: [[0,0],[0,0]]
  })

  function handleUpdate(newSize){
    setData((prevState) => ({
      ...prevState,
      columnSize: newSize,
    }));
  };

  function handleCellUpdate(newCell, row, column){
    data.grid[row][column] = newCell

    setData((prevState) => ({
      ...prevState,
      grid: [...data.grid],
    }));    
  }
  function updateGrid(){
    // GRID Size
    const arr = new Array(data.columnSize);
    for (let i=0; i<arr.length; i++) {
        arr[i] = new Array(data.columnSize).fill(0);
    }    

    arr[data.start.row][data.start.column] = data.start.symbol;
    arr[data.end.row][data.end.column] = data.end.symbol;

    setData((prevState) => ({
      ...prevState,
      grid: arr,
    }));
  }

  function swapPosition(cellOne, cellTwo){
    // get the grid and swap the position.
    data.grid[cellOne.row][cellOne.column] = cellTwo.content;
    data.grid[cellTwo.row][cellTwo.column] = cellOne.content;

    setData((prevState) => ({
      ...prevState,
      grid: data.grid,
    }));
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
