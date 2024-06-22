import './App.css'
import Die from './Die'
import React, {useState, useEffect} from'react'
import {nanoid} from 'nanoid'
import Confetti from "react-confetti"

function App() 
{
  function allNewDices()
  {
    const newDice = []
    for (let i = 0; i < 10; i++)
      newDice.push(generateNewDie());
    
    return newDice
  }

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  const [dice, setDices] = useState(allNewDices)
  const [won, setWon] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [startTime, setStartTime] = useState(false)
  
  useEffect(() => {
    let interval;
    if(startTime)
    {
      interval = setInterval(
        () => setSeconds(seconds+1),
        1000)
    }
    return () => clearInterval(interval)
  })

  useEffect(() => {
    let first = dice[0].value

    const sameVal = dice.every(die => die.value == first)
    const held = dice.every(die => die.isHeld)

    if(sameVal && held)
    {
      setWon(true)
      setStartTime(false)
    }

  }, [dice])


  let dices = dice.map((items) => {
    return <Die key={items.id} held={items.isHeld} value={items.value} id={items.id} handleHold={handleHold}/>
  })

  function handle()
  {
    if (won)
    {
      for (let i = 0; i < dice.length; i++) 
        dice[i].isHeld = false;
        
      setWon(false)
      setRolls(0)
      setSeconds(0)
      setStartTime(false)
    }

    setDices(oldDices => oldDices.map((item) => {
      return item.isHeld ? item : generateNewDie()
    
    }));

    setRolls(rolls => rolls + 1)

  }

  function handleHold(id)
  {
    const newDice = dice.map((items) => {
      if(items.id == id)
        items.isHeld = !items.isHeld
      return items
    })
    setDices(newDice)
    setStartTime(true)
  }
  
  const label = won ? 'New Game' : 'Reroll';
  const result = `You won and completed the game in ${rolls} rolls and in ${seconds} seconds.`

  return (
    <div className="App">
      <h1>TENZIES</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <p>{seconds} seconds.</p>
      <div className="dice-container">
        {dices}
      </div>
        <button className='roll-dice' onClick={handle}>{label}</button>
        {won && <Confetti /> }
        {won && <p>{result}</p>}
    </div>
  );
}

export default App;
