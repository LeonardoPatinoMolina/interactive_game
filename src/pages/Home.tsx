import { Link } from "react-router-dom"
import { AiFillSetting } from "react-icons/ai"
import { BsFastForwardFill } from "react-icons/bs"
import { RiGuideFill } from "react-icons/ri"
import { Footer } from "../components/Footer";


export const Home = () => {

  return (
    <section className="home">
      <header className="home__header">
        <h1 className="home__header__title">
          ¿V<span className="home__header__title--span">ERDADERO</span>-F<span className="home__header__title--span">ALSO</span>?
        </h1>
        <div className="home__header__logo open">
          {Array.from({length: 12}).map((_,i)=><div key={i} className={`home__header__logo__${i + 1}`}>O</div>)}
        </div>
        <div className="home__header__logo close">
          {Array.from({length: 12}).map((_,i)=><div key={i} className={`home__header__logo__${i + 1}`}>X</div>)}
        </div>
      </header>
      <section className="home__section">
        <article className="home__section__description">
          Bienvenido a mi pequeño juego de <em>verdadero</em> o <em>falso</em>, puedes jugar algo aleatorio o puedes configurar tu propia partida, <em>¡buena suerte!</em>
        </article>
        <nav className="home__section__options">
          <Link 
            className="btn_noumorfus" 
            to={'/instructions'}
          >Instrucciones
            <RiGuideFill size={20} />
          </Link >
          <Link 
            className="btn_noumorfus" 
            to={'/configplay'}
          >Configurar partida
          <AiFillSetting size={20} />
          </Link>
          <Link 
            className="btn_noumorfus" 
            to={`/playzone/any`}
          >Partida rapida
            <BsFastForwardFill size={20} />
          </Link>
        </nav>
      </section>
      <Footer />
    </section>
  )
}
