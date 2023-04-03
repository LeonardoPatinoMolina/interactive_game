import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

  const endHandle= ()=>{
    navigate(`../gameover/${progress.goods}/${progress.bads}/${allQuestions?.length}`);
  };

  const clickHandle = (e: React.MouseEvent<HTMLDivElement>)=>{
    const reChoice = e.currentTarget.firstElementChild?.innerHTML;
    if(reChoice === question?.correctAnswer){
      setProgress((prev1)=>({...prev1, goods: prev1.goods + 1}))
    }else{
      setProgress((prev2)=>({...prev2, bads: prev2.bads + 1}))
    }
    generator?.next();
    };
    
  const defeatHandle = ()=>{
    setProgress((prev3)=>({...prev3, bads: prev3.bads + 1}));
    generator?.next();
  }
  useEffect(()=>{
    if(allQuestions?.length - (progress.bads + progress.goods) <= 0) endHandle();
  },[progress])

  return (
    <section className='playzone'>
      <header className='playzone__stats'>
        <div className='playzone__stats__status'>
          <ul className='playzone__stats__status__list'>
            <li className='playzone__stats__status__list__item'>{progress.goods}<span className='none'> : PB</span></li>
            <li className='playzone__stats__status__list__item'>{progress.bads}<span className='none'> :PM</span></li>
            <li className='playzone__stats__status__list__item'>{
              isSuccess && (progress.bads + progress.goods)
            }/{isSuccess ? allQuestions.length: 0}<span className='none'> </span></li>
          </ul>
        </div>
        <nav className='playzone__stats__nav'>
        <div className='playzone__stats__nav__actions'>
          <button 
            className='playzone__stats__nav__actions__btn'
            onClick={defeatHandle}
          >Me rindo</button>
          <button 
            className='playzone__stats__nav__actions__btn'
            onClick={endHandle}
          >Finalizar</button>
        </div>
        </nav>
      </header>
      <main className='playzone__main'>
        <section className='playzone__main__question'>
          <h2 className='playzone__main__question__title'>Pregunta</h2>
          <p>
            {(!isLoading && isSuccess) ? question?.question : "..."}
          </p>
        </section>
        <div onClick={clickHandle} className='playzone__main__sector --one'>
          <span>
            {(!isLoading && isSuccess) ? options.one : "..."}
          </span>
        </div>
        <div onClick={clickHandle} className='playzone__main__sector --two'>
          <span>
            {(!isLoading && isSuccess) ? options.two : "..."}
          </span>
        </div>
      </main>
    </section>
  )
}