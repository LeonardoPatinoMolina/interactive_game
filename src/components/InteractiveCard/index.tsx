import React, { LegacyRef, useEffect } from 'react';
import { useDraggable } from '../../hooks/useDraggable';
import { Aligment } from '../../types/globals';
import { MyEmitter } from '../../utilities/emitter';
import './style/interectivecard.scss';

interface DivMakerProps {
  amount: number;
}
const DivMaker = ({amount}: DivMakerProps) => {
  let divs: Array<string> = Array.from({length: amount});
  return (<>{divs.map((e, indx)=> <div key={indx} className={`interactive-card__cell interactive-card__cell-${indx + 1}`}></div>)}</>)
}

interface InteractiveCardProps {
  body: string,
  aligment: Aligment;
  positionMutator?: MyEmitter
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({body, aligment, positionMutator}) => {

  const [itemDraggable, changePosition] = useDraggable({aligment});
  useEffect(()=>{
    if(positionMutator){
      positionMutator.on('muteposition',(e)=>{
        changePosition(e.detail)
      });
    }
    return ()=>{
      if(positionMutator){
        positionMutator.off('muteposition',(e)=>{
          changePosition(e.detail)
        });
      }
    }
  }, [])

  return (
    <div className='interactive-card' ref={itemDraggable as LegacyRef<HTMLDivElement>}>
      <DivMaker amount={100} />
      <div className='interactive-card__content'>
        {body}
      </div>
    </div>
  )
}

export {InteractiveCard}