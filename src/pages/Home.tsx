import { Link } from "react-router-dom"
import { BsFastForwardFill, BsFillPlayFill } from "react-icons/bs"
import { RiGuideFill } from "react-icons/ri"
import { FaInfoCircle } from "react-icons/fa"
import { Footer } from "../components/Footer";
import { Modal } from "../components/Modal";
import { useModal } from "../hooks/useModal";
import { About } from "../components/About";


export const Home = () => {

  const {loot, open, close} = useModal({isOpen: false});



  return (
    <>
    <Modal loot={loot} title="Acerca de" confirmM={close} options={[{content: "Cerrar", choice: "lorem"}]}>
      <About />
    </Modal>
    <section className="home">
      <div data-info="Más información." className="home__about"  onClick={open}><FaInfoCircle /></div>
      <header className="home__header">
        <h1 className="home__header__title">
          ¿V<span className="home__header__title--span">ERDE</span>. o .R<span className="home__header__title--span">OJO</span>?
        </h1>
        <div className="home__header__logo open">
          {Array.from({length: 12}).map((_,i)=><div key={i} className={`home__header__logo__${i + 1}`}>V</div>)}
        </div>
        <div className="home__header__logo close">
          {Array.from({length: 12}).map((_,i)=><div key={i} className={`home__header__logo__${i + 1}`}>R</div>)}
        </div>
      </header>
      <section className="home__section">
        <article className="home__section__description">
          Bienvenido a mi pequeño juego de <em>preguntas</em> y <em>respuestas</em>, puedes jugar algo rapido y aleatorio o puedes configurar tu propia partida, <em>¡buena suerte!</em>
        </article>
        <nav className="home__section__options">
          <Link 
            className="home__section__options__instructions btn_noumorfus" 
            to={'/instructions'}
          >Instrucciones
            <RiGuideFill size={20} />
          </Link >
          <Link 
            className="home__section__options__play btn_noumorfus" 
            to={'/configplay'}
          >Nueva partida
          <BsFillPlayFill size={20} />
          </Link>
          <Link 
            className="home__section__options__quick_play btn_noumorfus" 
            to={`/playzone/any`}
          >Partida rapida
            <BsFastForwardFill size={20} />
          </Link>
        </nav>
      </section>
      <Footer />
    </section>
    </>
  )
}
