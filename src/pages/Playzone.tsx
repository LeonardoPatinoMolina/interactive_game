import { LegacyRef, useState } from 'react';
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
  const { isSuccess, generator, question, isError, allQuestions} = useQuestion({type: type! as "custom" | "any"})
  
  const [itemDraggable, changePosition, currentP] = useDraggable({
    aligment: 'center', 
  });

  const {check, refChoiceFalse, refChoiceTrue} = useChoice({
    target: itemDraggable?.current!, 
    positionTarget: currentP
  });

  const clickHandle = ()=>{
      generator?.next()
      changePosition('center')
      console.log(check());
      setProgress({
        bads: 0,
        goods: 2
      })
      if(`${check()}` === question?.correct_answer){
        setProgress({...progress, goods: progress.goods + 1})
      }else{
        setProgress({...progress, goods: progress.bads + 1})
      }
    };

    const endHandle= ()=>{
      navigate(`../gameover/${progress.goods}/${progress.bads}`);
      // navigate(`../gameover/1/${allQuestions.length}`);
    }

  return (
    <section className='playzone'>
      {/* {<InteractiveCard 
        dragRef={itemDraggable} 
        body={ 'lorem'} 
      />} */}
      {isSuccess && <InteractiveCard 
        dragRef={itemDraggable} 
        body={question?.question ?? 'lorem'} 
      />}
      <nav className='playzone__stats'>
        <div className='playzone__stats__status'>
          <p>Aciertos: {progress.goods}</p>
          <p>Fallas: {progress.bads}</p>
        </div>
        <button 
          className='playzone__stats__btn'
          onClick={clickHandle}
          >Comprobar</button>
        <button 
          className='playzone__stats__btn'
          onClick={clickHandle}
        >Me rindo</button>
        <button 
          className='playzone__stats__btn'
          onClick={endHandle}
        >Fin</button>
      </nav>
      <section ref={refChoiceTrue as LegacyRef<HTMLElement>} className='playzone__true-sector'></section>
      <section ref={refChoiceFalse as LegacyRef<HTMLElement>} className='playzone__false-sector'></section>
    </section>
  )
}