import React from "react";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import { BsFillCaretLeftFill } from "react-icons/bs";

const Instructions = () => {
  return (
    <section className="instructions">
      <h1 className="instructions__title">Instrucciones</h1>
      <Link to="/" className="instructions__btn">
        <BsFillCaretLeftFill />
        Volver a inicio
      </Link>
      <p className="instructions__paragraph">
        La reglas son muy sensillas, una vez que inicie la partida, aparecerá
        flotando una targeta con una pregunta en su interior:
      </p>
      <div className="instructions__grafic1">
        <svg width={200} height={150}>
          <rect
            x={0}
            rx={10}
            ry={10}
            y={0}
            width={200}
            height={150}
            fill="#fff6"
            strokeWidth={2}
            stroke="#000"
          />
          <text
            x={35}
            fontWeight="bold"
            fontSize={25}
            y={60}
            width={200}
            height={65}
            fill="#000"
          >
            ¿Pregunta?
          </text>
        </svg>
      </div>
      <p className="instructions__paragraph">
        Esta tarjeta estará suspendida sobre un fondo dividido por dos zonas,
        una de color <em>rojo</em> y otra de color <em>verde</em>, en cada una
        de estas zonas podrás ver una respuesta candidata:
      </p>

      <div className="instructions__grafic2 big">
        <svg width={200} height={150}>
          <rect
            x={180}
            y={0}
            width={20}
            height={15}
            fill="#f00"
            strokeWidth={2}
            stroke="#000"
          />
          <rect
            x={0}
            y={0}
            width={180}
            height={15}
            fill="#000"
            strokeWidth={2}
            stroke="#000"
          />
          <rect
            x={100}
            y={15}
            width={100}
            height={130}
            fill="#45ffa2"
            strokeWidth={2}
            stroke="#000"
          />
          <rect
            x={0}
            y={15}
            width={100}
            height={130}
            fill="#ff7e57"
            strokeWidth={2}
            stroke="#000"
          />
          <text x={15} y={85} width={200} height={65} fill="#000">
            respuesta
          </text>
          <text x={120} y={85} width={200} height={65} fill="#000">
            respuesta
          </text>
        </svg>
      </div>
      <div className="instructions__grafic2 small">
        <svg width={130} height={200}>
        <rect
            x={110}
            y={180}
            width={20}
            height={20}
            fill="#f00"
            strokeWidth={2}
            stroke="#000"
          />
          <rect
            x={0}
            y={180}
            width={110}
            height={20}
            fill="#000"
            strokeWidth={2}
            stroke="#000"
          />
          <rect
            x={0}
            y={90}
            width={130}
            height={90}
            fill="#45ffa2"
            strokeWidth={2}
            stroke="#000"
          />
          <rect
            x={0}
            y={0}
            width={130}
            height={90}
            fill="#ff7e57"
            strokeWidth={2}
            stroke="#000"
          />
          <text x={35} y={50} width={200} height={65} fill="#000">
            respuesta
          </text>
          <text x={35} y={135} width={200} height={65} fill="#000">
            respuesta
          </text>
        </svg>
      </div>

      <p className="instructions__paragraph">
        puedes elegir una de ellas simplemente dando click/touch sobre la zona que corresponda. Esto hará que pases a la siguiente pregunta
      </p>

      <p className="instructions__paragraph">
        Si por desgracia te ves vencido por el reto puedes elegir saltar pregunta con
        la opción: <em>me rindo</em>.
      </p>
      <div className="instructions__grafic3">
        <svg width={200} height={30}>
          <rect
            rx={10}
            ry={10}
            x={0}
            y={0}
            width={200}
            height={30}
            fill="transparent"
            strokeWidth={5}
            stroke="#000"
          />
          <text
            x={65}
            y={20}
            fontWeight="bold"
            fontSize={15}
            width={200}
            height={65}
            fill="#000"
          >
            Me rindo
          </text>
        </svg>
      </div>

      <p className="instructions__paragraph">
        Si decides afrontar el reto y tu elección resulta ser la correcta,
        obtendrás un <em>punto bueno</em>, si resulta estar incorrecta obtendrás
        un <em>punto malo</em>, siempre que te rindas te ganarás un punto malo{" "}
        <em>:(</em>
      </p>

      <div className="instructions__grafic4">
        <svg width={250} height={80}>
        <rect
            rx={10}
            ry={10}
            x={0}
            y={0}
            width={250}
            height={80}
            fill="transparent"
            strokeWidth={2}
            stroke="#000"
          />
        <rect
            rx={10}
            ry={10}
            x={10}
            y={10}
            width={230}
            height={60}
            fill="#0009"
            strokeWidth={2}
            stroke="#000"
          />
          <text
            x={30}
            y={45}
            fontWeight="bold"
            fontSize={18}
            width={200}
            height={65}
            fill="#ada"
          >
            0 :PB
          </text>
          <text
            x={100}
            y={45}
            fontWeight="bold"
            fontSize={18}
            width={200}
            height={65}
            fill="#daa"
          >
            0 :PM
          </text>
          <text
            x={190}
            y={45}
            fontWeight="bold"
            fontSize={18}
            width={200}
            height={65}
            fill="#aad"
          >
            0/N
          </text>
        </svg>
      </div>
      <p className="instructions__paragraph">Podrás observar en el marcador los puntos buenos (en color Verde), los puntos malos (en color Rojo) y las preguntas faltantes (en color Azul).</p>
      <p className="instructions__paragraph">
        Puedes elegir finalizar la partida en cualquier momento con el botón rojo. Tómalo con calma, ya verás que podrás demostrar tu gran sabiduría
        ;)
      </p>
      <Link to="/" className="instructions__btn">
        <BsFillCaretLeftFill />
        Volver a inicio
      </Link>
      <Footer />
    </section>
  );
};

export { Instructions };
