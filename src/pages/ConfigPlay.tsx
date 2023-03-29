import React, { useState } from 'react'
import { GetQuestionsUrlI } from '../services/endpoints'
import { useAppDispatch } from '../context/reduxHooks'
import { setConfigQuestion } from '../context/store/feature/question'
import {categories} from '../assets/categories.json'
import { useNavigate } from 'react-router-dom'

interface ConfigPLayProps {

}

const initialFormState: GetQuestionsUrlI = {
  amount: '8',
  category: '9',
  difficulty: 'medium'
}

const ConfigPlay: React.FC<ConfigPLayProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState<GetQuestionsUrlI>(initialFormState);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setConfigQuestion({config: form}))
    navigate('/playzone/custom');
  };

  const handleOptionClick = (e: React.MouseEvent<HTMLDivElement>)=>{
    const {value, name} = e.currentTarget.dataset;
    setForm({
      ...form,
      [name as string]: value
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const {value, name} = e.target;
    setForm({
      ...form,
      [name as string]: value
    })
  }

  return (
    <main className='configplay'>
      <form className='configplay__form' onSubmit={handleSubmit}>
        <label className='configplay__form__label'>
          Categoría
          <section className="category">
            {categories.map((category)=>{
              return (
              <div 
                key={category.id} 
                onClick={handleOptionClick}
                data-value={`${category.id}`} 
                data-name={'category'} 
              >{category.name}</div>)
            })}
          </section>
        </label>
        <label className='configplay__form__label' htmlFor="">
          Cantidad de preguntas
          <input type="number" name="amount" value={form.amount} onChange={handleChange} />
        </label>
        <label className='configplay__form__label'>
          <section className="difficulty">
            <div 
              onClick={handleOptionClick}
              data-value={`easy`} 
              data-name={'difficulty'} 
            >Fácil</div>
            <div 
              onClick={handleOptionClick}
              data-value={`medium`} 
              data-name={'difficulty'} 
            >Media</div>
            <div 
              onClick={handleOptionClick}
              data-value={`hard`} 
              data-name={'difficulty'} 
            >Difícil</div>
          </section>
        </label>
        <button type='submit'>Confirmar</button>
      </form>
    </main>
  )
}

export { ConfigPlay }