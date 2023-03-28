import { InteractiveCard } from '../components/InteractiveCard'
import { useParams } from 'react-router-dom'
import { useGetQuestionQuery } from '../context/api/apiSlice';


export const Playzone: React.FC = () => {

  const {amount, category, difficulty} = useParams();
  
  const epa = {
    amount: amount!,
    category: category!,
    difficulty: difficulty!
  }

  return (
    <main className='playzone' style={{position: 'relative', margin: '10px', boxSizing: 'border-box'}}>
      <InteractiveCard body={'loremn'} />
      <section className='playzone__true-sector'></section>
      <section className='playzone__false-sector'></section>
    </main>
  )
}