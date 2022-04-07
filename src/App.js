import { useState, useEffect } from 'react';
import './App.css';
import DisplayGraph from './components/displayGraph';
import ControlButtons from './components/controlButtons';

function App() {

  const [data, setData] = useState({
    columnSize: 2,
    rowSize: 2,
    start: {
      column: 0,
      row: 0,
    },
    end: {
      column: 1,
      row: 1,
    },
    grid: [["A",0],[0,"B"]]
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

    pathFind();
  }

  function swapPosition(cellOne, cellTwo){
    handleCellUpdate(cellOne.content, cellTwo.row, cellTwo.column)
    handleCellUpdate(cellTwo.content, cellOne.row, cellOne.column)
    updateGrid()
  }
  
  function exploreLocation(location){
    let r = location.row;
    let c = location.column;
    let allNeighbors = [];

    const neighbors = [
      {row: r-1, column: c},
      {row: r, column: c + 1},
      {row: r + 1, column: c},
      {row: r, column: c - 1}
    ]

    for (let i = 0; i < neighbors.length; ++i){
        const nRow = neighbors[i].row
        const nCol = neighbors[i].column

        if(nRow < 0 || nRow > data.columnSize - 1 ){
          continue
        }

        if(nCol < 0 || nCol > data.columnSize - 1){
          continue
        }
        
        //Blocks
        if(data.grid[nRow][nCol] == -1){
          continue
        }

        allNeighbors.push(neighbors[i])
    }

    return allNeighbors;

  }


  function clearGrid(){
    // function will iterate through the grid and remove any number > 0
    for(let i = 0; i < data.columnSize; i++){
      for(let j = 0; j < data.columnSize; j++){
        if(data.grid[i][j] > 0){
          handleCellUpdate(0, i, j)
        }
      }
    }
  }
  function showPath(current, parent){

    while(current.row != data.start.row || current.column != data.start.column){
      if(data.grid[current.row][current.column] !== "A" && data.grid[current.row][current.column] !== "B"){
        handleCellUpdate(1, current.row, current.column)
      }
      current = parent[`${current.row}x${current.column}`]
    }
  }

  function pathFind(){

    clearGrid()
    const queue = []
    queue.push(data.start)

    let visted = {};
    let parentList = {};

    while(queue.length){
      let currentLocation = queue.shift();

      if (currentLocation.row == data.end.row && currentLocation.column == data.end.column ){
        //found the path  - walk backwards to print the path
        showPath(currentLocation, parentList);
        return parentList;
      }

      let vistKey = `${currentLocation.row}x${currentLocation.column}`;
      visted[vistKey] = true;
      let neighbors = exploreLocation(currentLocation);
     

      neighbors.forEach(neighbor =>{
        if(visted[`${neighbor.row}x${neighbor.column}`] != true){
          queue.push(neighbor);
          parentList[`${neighbor.row}x${neighbor.column}`] = currentLocation;
        }
      })
    }
    console.log(parentList)
    return -1;
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
