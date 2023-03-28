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
  // console.log(epa);
  
  const {data, isSuccess, error, isLoading} = useGetQuestionQuery(epa)
  if(error) console.log(error);
  if(isSuccess) console.log(data)
  

  return (
    <main className='playzone'>
      {isSuccess && <InteractiveCard body={data[0].question} />}
      
      <section className='playzone__true-sector'></section>
      <section className='playzone__false-sector'></section>
    </main>
  )
}