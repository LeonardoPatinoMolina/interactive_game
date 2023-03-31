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
      <p className='instructions__paragraph'>La reglas son muy sensillas, tendrás una zona de juego similar a la siguiente:</p>
      <div className='instructions__grafic1 big'>
        <svg width={200} height={150}>
          <rect x={0} y={0} width={200} height={150} fill='transparent' strokeWidth={5} stroke="#000" />
          <rect x={0} y={0} width={200} height={20} fill='transparent' strokeWidth={5} stroke="#000" />
          <rect x={0} y={20} width={100} height={150} fill='transparent' strokeWidth={5} stroke="#000" />
          <text x={10} y={85} width={200} height={65} fill='#000'>verdadero</text>
          <text x={130} y={85} width={200} height={65} fill='#000'>falso</text>
        </svg>
      </div>
      <div className='instructions__grafic1 small'>
        <svg width={200} height={150}>
          <rect x={0} y={0} width={200} height={150} fill='transparent' strokeWidth={5} stroke="#000" />
          <rect x={0} y={0} width={200} height={20} fill='transparent' strokeWidth={5} stroke="#000" />
          <rect x={0} y={20} width={200} height={65} fill='transparent' strokeWidth={5} stroke="#000" />
          <text x={70} y={55} width={200} height={65} fill='#000'>verdadero</text>
          <text x={84} y={120} width={200} height={65} fill='#000'>falso</text>
        </svg>
      </div>
      <p className='instructions__paragraph'>En ella aparecerá flotando una targeta con la cual podrás interacuar. Puedes arrastrarla de un lugar a otro manteniendo el cursor o tu dedo sobre ella:</p>
      <div className="instructions__grafic2">
        <svg width={200} height={150}>
          <rect x={0} rx={10} ry={10} y={0} width={200} height={150} fill='transparent' strokeWidth={5} stroke="#000" />
          <text x={84} fontWeight="bold" fontSize={50} y={100} width={200} height={65} fill='#000'>?</text>
        </svg>
      </div>
      <p className='instructions__paragraph'>Esta tarjeta contendrá una afirmación, tú deberás juzgar si es <em>verdadera</em> o <em>falsa</em>, para ello tendrás una barra en la parte superior:</p>
      <div className='instructions__grafic3'>
      <svg width={250} height={30}>
          <rect x={0} y={0} width={250} height={30} fill='transparent' strokeWidth={5} stroke="#000" />
          <rect x={0} y={0} width={40} height={30} fill='transparent' strokeWidth={2} stroke="#000" />
          <rect x={0} y={0} width={130} height={30} fill='transparent' strokeWidth={2} stroke="#000" />
          <rect x={0} y={0} width={220} height={30} fill='transparent' strokeWidth={2} stroke="#000" />
          {/* <text x={70} y={55} width={200} height={65} fill='#000'>verdadero</text>
          <text x={84} y={120} width={200} height={65} fill='#000'>falso</text> */}
        </svg>
      </div>
      <p className='instructions__paragraph'>pero antes debes saber que, para elegir una opcion entre verdadero o falso, necesitas arrastrar la tarjeta hasta el área que corresponda a <em>verdadero</em> o que corresponda <em>falso</em>, lo notarás recien la veas :).</p>
      
      <p className='instructions__paragraph'>Luego que estes seguro que la tarjeta está sobre la zona, confirmas tu elección con la opción: <em>confirmar</em></p>
      <p className='instructions__paragraph'>Si por desgracia te ves vencido por el reto puedes elegir rendirte con la opción: <em>me rindo</em>.</p>

      <p className='instructions__paragraph'>Si decides afrontar el reto y tu elección resulta ser la correcta, obtendrás un <em>punto bueno</em>, si resulta estar icorrecta obtendrás un <em>punto malo</em>, siempre que te rindas te ganarás un punto malo <em>:(</em></p>
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