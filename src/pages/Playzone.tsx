import { LegacyRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InteractiveCard } from '../components/InteractiveCard';
import { useChoice } from '../hooks/useChoice';
import { useDraggable } from '../hooks/useDraggable';
import { useQuestion } from '../hooks/useQuestion';

type progressState = {
  goods: number,
  bads: number,
}

export const Playzone: React.FC = () => {

  const navigate = useNavigate()
  const [progress, setProgress] = useState<progressState>({bads: 0, goods: 0})
  const {type} = useParams()
  const { 
    isSuccess,
    isLoading, 
    generator, 
    question, 
    isError, 
    allQuestions,
    options  
  } = useQuestion({
      type: type! as "custom" | "any",
    });
  
  const [itemDraggable, changePosition, currentP] = useDraggable({
    aligment: 'center', 
  });

  const {check, refChoiceTwo, refChoiceOne} = useChoice({
    target: itemDraggable?.current!, 
    positionTarget: currentP
  });
  const endHandle= ()=>{
    navigate(`../gameover/${progress.goods}/${progress.bads}/${allQuestions?.length}`);
  };

  const clickHandle = ()=>{
      generator?.next();
      changePosition('center');
      if(`${check()}` === question?.correctAnswer){
        setProgress((prev1)=>({...prev1, goods: prev1.goods + 1}))
      }else{
        setProgress((prev2)=>({...prev2, bads: prev2.bads + 1}))
      }
    };
    
  const defeatHandle = ()=>{
    setProgress((prev3)=>({...prev3, bads: prev3.bads + 1}))
  }
  useEffect(()=>{
    if(allQuestions?.length - (progress.bads + progress.goods) === 0) endHandle();
  },[progress])

  return (
    <section className='playzone'>
      {(!isLoading && isSuccess) && <InteractiveCard 
        dragRef={itemDraggable} 
        body={question?.question ?? 'lorem'} 
      />}
      <header className='playzone__stats'>
        <div className='playzone__stats__status'>
          <ul className='playzone__stats__status__list'>
            <li className='playzone__stats__status__list__item'>{progress.goods}<span className='none'> : PB</span></li>
            <li className='playzone__stats__status__list__item'>{progress.bads}<span className='none'> :PM</span></li>
            <li className='playzone__stats__status__list__item'>{
              isSuccess && allQuestions?.length - (progress.bads + progress.goods)
            }/{isSuccess ? allQuestions.length: 0}<span className='none'> </span></li>
          </ul>
        </div>
        <nav className='playzone__stats__nav'>
        <div className='playzone__stats__nav__actions'>
          <button 
            className='playzone__stats__nav__actions__btn'
            onClick={clickHandle}
            >Confirmar</button>
          <button 
            className='playzone__stats__nav__actions__btn'
            onClick={defeatHandle}
          >Me rindo</button>
          <button 
            className='playzone__stats__nav__actions__btn'
            onClick={endHandle}
          >X</button>
        </div>
        </nav>
      </header>
      <section ref={refChoiceOne as LegacyRef<HTMLElement>} className='playzone__one-sector'>
        <span>
          {(!isLoading && isSuccess) ? options.one : ""}
        </span>
      </section>
      <section ref={refChoiceTwo as LegacyRef<HTMLElement>} className='playzone__two-sector'>
        <span>
          {(!isLoading && isSuccess) ? options.two : ""}
        </span>
      </section>
    </section>
  )
}