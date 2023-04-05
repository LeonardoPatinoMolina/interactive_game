import React from 'react'


const About: React.FC = () => {
  return (
    <div className='about'>
      <p className='about__paragraph'>La presente app es un ejercicio en el que se emplearon las siguientes tecnologías:</p>
      <ul className="about__list">
        <li className="about__list__item">
          <h3>React.js</h3>
          <img
            id="html_logo"
            className="about__list__item__logo"
            src="react.svg"
            alt="react.js logo"
            />
          </li>
          <li className="about__list__item">
            <h3>Scss</h3>
            <img
            id="css_logo"
            className="about__list__item__logo"
            src="scss.svg"
            alt="scss logo"
          />
        </li>
        <li className="about__list__item">
          <h3>Typescript</h3>
          <img
            id="ts_logo"
            className="about__list__item__logo"
            src="typescript.svg"
            alt="Typescript logo"
          />
        </li>
      </ul>
      <p className='about__paragraph'>Para la comleta funcionalidad de la app se emplearon algunos aspectos de estas tecnologías como lo son:</p>
      <ol className='about__order_list'>
        <li>Administración de estado global con redux toolkit y react-redux.</li>
        <li>Manejo asíncrono del estado global con redux toolkit RTK.</li>
        <li>Enrutamiento del lado del cliente con reac-router-dom v6.</li>
        <li>Consumo de api REST para uso de grandes cantidades de datos por demanda.</li>
        <li>Estilizado potenciado por el preprocesador de css Sass.</li>
      </ol>

    </div>
  )
}

export { About }