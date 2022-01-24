import "./App.css";
import { useRef, useState } from "react";
import DraggableList from "./Components/DraggableList";
import DraggableItem from "./Components/DraggableItem";

const testlist = [
  { taskName: "task1", description: "this is a test task" },
  { taskName: "task2", description: "this is a test task" },
  { taskName: "task3", description: "this is a test task" },
  { taskName: "task4", description: "this is a test task" },
  { taskName: "task5", description: "this is a test task" },
  { taskName: "task6", description: "this is a test task" },
  { taskName: "task7", description: "this is a test task" },
  { taskName: "task8", description: "this is a test task" },
  { taskName: "task9", description: "this is a test task" },
  { taskName: "task10", description: "this is a test task" },
];

function App() {
  const [list, setList] = useState(testlist);
  const listContainer = useRef(null);


  return (
    <div className="App">
      <div style={{width:'100%', height:'300px',backgroundColor:'red'}}>

      </div>

      <div ref={listContainer} className="listContainer">
        <DraggableList list={list} containerRef={listContainer} onChange={(newList)=>setList(newList)} ItemTemplate={DraggableItem} width='500px'/>

      </div>
    </div>
  );
}

export default App;
