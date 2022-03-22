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

  function handleUpdate(){
    setData((prevState) => ({
      ...prevState,
      columnSize: 20,
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

    console.log(data.grid)
  }

  useEffect(()=>{
    updateGrid()
  }, [])

  return (
    <div className="App">
      <div className='appHeader'><h1>DDD ALGORITHM VISUALIZER</h1></div>
      <ControlButtons className='appControl'update={handleUpdate} displayGrid={updateGrid}/>
      <DisplayGraph className='appDisplay' data={data}/>
    </div>
  );
}

export default App;
