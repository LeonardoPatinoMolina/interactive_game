import React from 'react'
import './experiment.scss'

const DivMaker = () => {
let divs: Array<string> = Array.from({length: 100});
  return (<>{divs.map((e, indx)=> <div key={indx} className={`reflection-grid-cell reflection-grid-cell-${indx + 1}`}></div>)}</>)
}

export default function Experiment() {

  return (
  <>
    <div className='reflection-container'>
      <DivMaker />
      <div className='reflection-content'></div>
    </div>
  </>
  )
}
