import { LegacyRef } from "react";
import { Link } from "react-router-dom"
import { useDraggable } from "../hooks/useDraggable";
import { generateConfigRandom } from "../utilities/utils";

export const Home = () => {

  const [itemD] = useDraggable({aligment: 'center'})

  return (
    <main className="home">
      <h1 className="home__title">¿Sí o No?</h1>
      <section className="home__section">
        <article className="home__section__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quasi laboriosam iusto a facere saepe dolor deserunt. Laudantium tempore voluptates iusto ipsam.
        </article>
        <div className="home__section__options">
          <div className="home__section__options--suboptions">
          <Link 
            className="btn btn__confirm" 
            to={'/configplay'}
          >Configurar partida</Link>
          <Link 
            className="btn btn__confirm" 
            to={`/playzone/any`}
          >Partida rapida</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
