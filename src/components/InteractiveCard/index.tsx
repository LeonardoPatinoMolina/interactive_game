import React, { LegacyRef } from 'react';
import { useDraggable } from '../../hooks/useDraggable';
import './style/interectivecard.scss';

interface DivMakerProps {
  amount: number;
}
const DivMaker = ({amount}: DivMakerProps) => {
  let divs: Array<string> = Array.from({length: amount});
  return (<>{divs.map((e, indx)=> <div key={indx} className={`interactive-card__cell interactive-card__cell-${indx + 1}`}></div>)}</>)
}

interface InteractiveCardProps {
  body: string
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({body}) => {

  const [itemDraggable] = useDraggable();

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