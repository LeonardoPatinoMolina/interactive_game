import { useParams } from 'react-router-dom';
import { InteractiveCard } from '../components/InteractiveCard';
import { useQuestion } from '../hooks/useQuestion';


export const Playzone: React.FC = () => {

  const {type} = useParams()
  const { isSuccess, generator, question} = useQuestion({type: type! as "custom" | "any"})
  const clickHandle = ()=>{
      generator?.next()
    }
  return (
    <main className='playzone'>
      {isSuccess && <InteractiveCard body={question?.question ?? 'lorem'} />}
      <button onClick={clickHandle}>next</button>
      <section className='playzone__true-sector'></section>
      <section className='playzone__false-sector'></section>
    </main>
  )
}