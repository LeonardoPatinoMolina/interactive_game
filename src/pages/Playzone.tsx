import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { InteractiveCard } from '../components/InteractiveCard';
import { useQuestion } from '../hooks/useQuestion';
import { Aligment } from '../types/globals';
import { MyEmitter } from '../utilities/emitter';
import { useNavigate } from 'react-router-dom';


export const Playzone: React.FC = () => {

  const {type} = useParams()
  const navigate = useNavigate()
  const [mutator] = useState<MyEmitter>(new MyEmitter());
  const { isSuccess, generator, question} = useQuestion({type: type! as "custom" | "any"})

  const clickHandle = ()=>{
      generator?.next()
      mutator.emit<Aligment>('muteposition', 'center')
    };

    const endHandle= ()=>{
      navigate(-1);
    }
  return (
    <main className='playzone'>
      {isSuccess && <InteractiveCard body={question?.question ?? 'lorem'} aligment={'center'} positionMutator={mutator} />}
      <section className='playzone__stats'>
        <div className='playzone__stats__status'>
          <p>aciertos</p>
          <p>Fallas</p>
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
      </section>
      <section className='playzone__true-sector'></section>
      <section className='playzone__false-sector'></section>
    </main>
  )
}