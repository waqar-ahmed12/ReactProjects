import React from 'react'

export default function Die(props) 
{
  const style = {backgroundColor: props.held ? '#212121': 'white',
    color: props.held ? 'white': '#212121'
  }
  return (
    <div>
      <div className="die-face" style={style} onClick={() => props.handleHold(props.id)}>
        {props.value}
      </div>
    </div>
  )
}
