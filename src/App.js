import "./App.css";
import React, { useEffect, useState } from "react";
import Accordion from './accordion.js';
import Mode from "./Mode.js";
import data from "./data.js";

function App() 
{
  const [background, setBackground] = useState("#808080");
  const [foreground, setForeground] = useState("white");

  React.useEffect(() => 
  {
    document.body.style.backgroundColor = background;
    document.body.style.color = foreground;
  }, [background]);


  function changeBackground() 
  {
    let back = background == "white" ? "#808080" : "white";
    let fore = foreground == "#808080" ? "white" : "#808080";
    setBackground(back);
    setForeground(fore);
  }

  const [status, setStatus] = useState([]);
  

  //For the first time, we add expanded property to the data
  //and set data to useEffect
  useEffect(() =>{
    data.forEach((items) => items.expanded = false);
    
    setStatus(data)
  }, [])

  const expand = (id) => 
  {
    //Methods to expand or collapse

    // let obj = {...status}
    // if(data[id].id == id + 1)
    // {     
    //   obj[id].expanded = !obj[id].expanded ? true : false
    //   setStatus(obj)
    // }

    
    setStatus(oldData => oldData.map(
      item => 
        {
          return item.id == (id) ? 
          {...item, expanded: item.expanded ? false : true} : 
          item
        }))
  }


  const AccordionArray = status.map((item) => 
     <Accordion key={item.id} question={item.question} answer={item.answer} expand={expand} id={item.id} expanded={item.expanded}/>
  );

  return (
    <div className="App">
      <h1>Change Background Color</h1>

      <Mode back={background} change={changeBackground}/>

      <hr />

      {AccordionArray}
    </div>
  );
}

export default App;
