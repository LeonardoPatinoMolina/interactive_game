import React from 'react'
import { Footer } from '../components/Footer'
import { Link } from 'react-router-dom'
import {BsFillCaretLeftFill} from 'react-icons/bs'

const Instructions = () => {
  return (
    <section className="instructions">
      <h1 className='instructions__title'>Instrucciones</h1>
      <Link to='/' className='instructions__btn'>
        <BsFillCaretLeftFill />
        Volver a inicio
      </Link>
      <p className='instructions__paragraph'>La reglas son muy sensillas, una vez que inicie la partida, aparecerá flotando una targeta con la cual podrás interatcuar. Puedes arrastrarla de un lugar a otro manteniendo el cursor o tu dedo sobre ella:</p>
      <div className="instructions__grafic1">
        <svg width={200} height={150}>
          <rect x={0} rx={10} ry={10} y={0} width={200} height={150} fill='#fff6' strokeWidth={5} stroke="#000" />
          <text x={35} fontWeight="bold" fontSize={25} y={60} width={200} height={65} fill='#000'>¿Pregunta?</text>
        </svg>
      </div>
      <p className='instructions__paragraph'>Esta tarjeta contendrá una pregunta, podrás ver las posibles respuestas divididas por dos zonas, una de color <em>rojo</em> y otra de color <em>verde</em></p>
      
      <div className='instructions__grafic2 big'>
        <svg width={200} height={150}>
          <rect x={0} y={0} width={200} height={20} fill='transparent' strokeWidth={5} stroke="#000" />
          <rect x={100} y={20} width={100} height={130} fill='#45ffa2' strokeWidth={5} stroke="#000" />
          <rect x={0} y={20} width={100} height={130} fill='#ff7e57' strokeWidth={5} stroke="#000" />
          <text x={15} y={85} width={200} height={65} fill='#000'>respuesta</text>
          <text x={120} y={85} width={200} height={65} fill='#000'>respuesta</text>
        </svg>
      </div>
      <div className='instructions__grafic2 small'>
        <svg width={200} height={150}>
          <rect x={0} y={0} width={200} height={20} fill='transparent' strokeWidth={5} stroke="#000" />
          <rect x={0} y={20} width={200} height={130} fill='#45ffa2' strokeWidth={5} stroke="#000" />
          <rect x={0} y={20} width={200} height={65} fill='#ff7e57' strokeWidth={5} stroke="#000" />
          <text x={70} y={55} width={200} height={65} fill='#000'>respuesta</text>
          <text x={70} y={120} width={200} height={65} fill='#000'>respuesta</text>
        </svg>
      </div>
      
      <p className='instructions__paragraph'>puedes elegir una de ellas arrastrando la tarjeta hasta el zona que le corresponda.</p>
      
      <p className='instructions__paragraph'>Luego que estes seguro que la tarjeta está sobre la zona, confirmas tu elección con la opción: <em>confirmar</em></p>
      <div className='instructions__grafic3'>
      <svg width={200} height={30}>
          <rect rx={10} ry={10} x={0} y={0} width={200} height={30} fill='transparent' strokeWidth={5} stroke="#000" />
          <text x={65} y={20} fontWeight="bold" fontSize={15} width={200} height={65} fill='#000'>Confirmar</text>
        </svg>
      </div>
      <p className='instructions__paragraph'>Si por desgracia te ves vencido por el reto puedes elegir rendirte con la opción: <em>me rindo</em>.</p>
      <div className='instructions__grafic4'>
      <svg width={200} height={30}>
          <rect rx={10} ry={10} x={0} y={0} width={200} height={30} fill='transparent' strokeWidth={5} stroke="#000" />
          <text x={65} y={20} fontWeight="bold" fontSize={15} width={200} height={65} fill='#000'>Me rindo</text>
        </svg>
      </div>

      <p className='instructions__paragraph'>Si decides afrontar el reto y tu elección resulta ser la correcta, obtendrás un <em>punto bueno</em>, si resulta estar incorrecta obtendrás un <em>punto malo</em>, siempre que te rindas te ganarás un punto malo <em>:(</em></p>
      <div>

      </div>
      <p className='instructions__paragraph'>Puedes elegir finaliza la partida en cualquier momento con el botón rojo. Tómalo con calma, ya verás que podrás demostrar tu gran sabiduría ;)</p>
      <Link to='/' className='instructions__btn'>
      <BsFillCaretLeftFill />
        Volver a inicio
      </Link>
      <Footer />
    </section>
  )
}

export { Instructions }