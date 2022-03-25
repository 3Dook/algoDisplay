import { useState, useEffect } from 'react';
import './App.css';
import DisplayGraph from './components/displayGraph';
import ControlButtons from './components/controlButtons';

function App() {

  const [data, setData] = useState({
    columnSize: 3,
    rowSize: 3,
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

  function updateGrid(){
    // GRID Size
    const arr = new Array(data.columnSize);
    for (let i=0; i<arr.length; i++) {
        arr[i] = new Array(data.columnSize).fill(i);
    }    

    arr[data.start.row][data.start.column] = data.start.symbol;
    arr[data.end.row][data.end.column] = data.end.symbol;

    setData((prevState) => ({
      ...prevState,
      grid: arr,
    }));

    console.log(data)
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
      <DisplayGraph className='appDisplay' data={data} swap={swapPosition}/>
    </div>
  );
}

export default App;
