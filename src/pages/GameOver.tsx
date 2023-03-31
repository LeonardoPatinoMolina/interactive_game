import React from 'react'
import { generateRandomInt } from '../utilities/utils'
import responsesJson from '../assets/finishResponses.json'
import { useParams, Link } from 'react-router-dom'

interface GameOverProps {

}

const GameOver: React.FC<GameOverProps> = () => {
  const { good, bad } = useParams();
  
  /**
   * encargada de generar una frase de finalización en base a la cantidadd de aciertos vs 
   * la cantidad esperada de aciertos
   */
  const makeSentence = (): string => {
    const percent = (parseInt(good!) * (parseInt(good!) + parseInt(bad!)) / 100) * 100;
    console.log(percent);
    
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
    const sentence = responsesJson.responses[levelSentence][generateRandomInt(0,10)]
    return sentence;
  }

  return (
    <section>
      <h1>Juego finalizado</h1>
      <p>{makeSentence()}</p>
      <ul>
        <li>aciertos: {good}</li>
        <li>fallas: {bad}</li>
      </ul>
      <nav>
        <Link to='/configplay'>Otra partida</Link>
        <Link to='/'>Inicio</Link>
      </nav>
    </section>
  )
}

export {GameOver}