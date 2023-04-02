import React from 'react'
import { generateRandomInt } from '../utilities/utils'
import responsesJson from '../assets/finishResponses.json'
import { useParams, Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { AiFillHome } from "react-icons/ai"
import { MdRestartAlt } from "react-icons/md"

interface GameOverProps {

}

const GameOver: React.FC<GameOverProps> = () => {
  const { good, bad, all } = useParams();
  
  /**
   * encargada de generar una frase de finalización en base a la cantidadd de aciertos vs 
   * la cantidad esperada de aciertos
   */
  const makeSentence = (): string => {
    let percent: number; 
    percent = (parseInt(good!) * parseInt(all!) / 100) * 100;
    if(parseInt(all!) === parseInt(bad!) + parseInt(good!)) {
      if(bad === "0") percent = 100;
      if(good === "0") percent = 0;
    };
    
    let levelSentence: keyof (typeof responsesJson.responses);
    if(percent <= 33){
      levelSentence = 'badOnes';
    }
    else if(percent <= 66){
      levelSentence = 'middOnes';
    }
    else{
      levelSentence = 'goodOnes'
    }
    const sentence = responsesJson.responses[levelSentence][generateRandomInt(0,9)]
    return sentence;
  }

  return (
    <section className='gameover'>
      <h1 className='gameover__title'>Juego finalizado</h1>
      <p className='gameover__sentence'>{makeSentence()}</p>
      <section className='gameover__results'>
        <p className='gameover__results__paragraph'>Has logrado un total de <em>{good} puntos buenos</em>.</p>
        <p className='gameover__results__paragraph'>Con un total de <em>{bad} puntos malos</em></p>
        <p className='gameover__results__paragraph'>El total de preguntas fueron <em>{all}</em></p>
        <table className='gameover__results__table'>
          <thead className='gameover__results__table__head'>
            <tr className='gameover__results__table__head__row'>
              <th className='gameover__results__table__head__row__item'>Puntos buenos</th>
              <th className='gameover__results__table__head__row__item'>Puntos malos</th>
              <th className='gameover__results__table__head__row__item'>Total preguntas</th>
            </tr>
          </thead>
          <tbody className='gameover__results__table__body'>
            <tr className='gameover__results__table__body__row'>
              <td className='gameover__results__table__body__row__item'>{good}</td>
              <td className='gameover__results__table__body__row__item'>{bad}</td>
              <td className='gameover__results__table__body__row__item'>{all}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <nav className='gameover__nav'>
        <Link className='btn_noumorfus gameover__nav__option' to='/configplay'>Otra partida
        <MdRestartAlt />
        </Link>
        <Link className='btn_noumorfus gameover__nav__option' to='/'>Inicio
        <AiFillHome />
        </Link>
      </nav>
      <Footer />
    </section>
  )
}

export {GameOver}