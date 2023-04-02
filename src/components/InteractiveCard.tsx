import React, { LegacyRef } from 'react';

interface DivMakerProps {
  amount: number;
}
const DivMaker = ({amount}: DivMakerProps) => {
  let divs: Array<string> = Array.from({length: amount});
  return (<>{divs.map((e, indx)=> <div key={indx} className={`interactive-card__cell interactive-card__cell-${indx + 1}`}></div>)}</>)
}

interface InteractiveCardProps {
  body: string,
  dragRef: React.MutableRefObject<HTMLElement | undefined>,
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({body, dragRef}) => {

  return (
    <div className='interactive-card' ref={dragRef as LegacyRef<HTMLDivElement>}>
      <DivMaker amount={100} />
      <div className='interactive-card__content'>
        {body}
      </div>
    </div>
  )
}

export { InteractiveCard };
