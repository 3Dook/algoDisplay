import { useState, useEffect } from 'react';
import './App.css';
import DisplayGraph from './components/displayGraph';
import ControlButtons from './components/controlButtons';

function App() {

  const [data, setData] = useState({
    columnSize: 10,
    rowSize: 10,
    start: {
      symbol: 'A',
      column: 1,
      row: 2,
    },
    end: {
      symbol: 'B',
      column: 2,
      row: 4,
    },
    grid: [[0,0],[0,0]]
  })

  function handleUpdate(){
    console.log("Sup")
    setData((prevState) => ({
      ...prevState,
      columnSize: 20,
    }));
  };

  function updateGrid(){
    // GRID Size
    const arr = new Array(data.rowSize);
    for (let i=0; i<arr.length; i++) {
        arr[i] = new Array(data.columnSize).fill(0);
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
    console.log(data.grid)
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
