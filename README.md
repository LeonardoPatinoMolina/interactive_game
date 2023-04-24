# ¿Verde o Rojo?
EL presente ejecicio es algo que he querido realizar desde que inicié mi formación como desarrollador __front-end__, una práctica en la que puediera exponer mis habilidades, dando a las páginas estilos atrevidos y originales. Planeo a partir de la fecha, incurrir en más inventivas semejantes a esta.

## ¿En qué consiste? 

Se trata de un pequeño juego que da uso una variante de la api gratuita __TriviaDB__, con ella pongo a disposición del jugador una serie de preguntas con un par de respuestas entre las cuales se encuentra la correcta y una incorrecta, el usuario deberá elegir una de ellas buscando la mayor cantidad de aciertos posibles.

## Herramientas empledas
En esta ocación quise poner en práctica un par de herramientas que había dejado de lado:

- __Typescript/React:__ esta combinación es muy interesante, más que solo usar typescript, tambien requerí interpretar de forma adecuada el manejo de los tipos en _React.js_, es solo cuestion de tiempo para familiarizarse con ellos.
- __Redux Toolkit RTK:__ a raíz el surgimiento de nuevas opciones para el manejo global del estado y asincronía como __react query__, supe de la existencia de este enfoque brindado por el entorno redux, antes de hacer el salto a aquellas nuevas tecnologías quise empaparme un poco con este apartado de la herramienta que ya he manejado con anterioridad respecto a la administración global del estado en __React.js__. Luego de entrenar con la documentación se comprende de maravilla.
- __Sass:__ poco a poco he estado familiarizándome con esta herramienta, me ha resultado muy satisfactoria, y he podido organizar mis hojas de estilo como nunca lo había hecho, además de abrir mis conocimientos a ciertos aspectos del esilizado que no había contemplado con anterioridad como lo son el manejo del diseño _responsive_ y la administración de medidas relativas para mejorar la _accesibilidad_.
- __CustomHooks:__ este aspecto en particular de react me encanta, poder encapsular lógica compleja para despejar en la medida de lo posible la declaración del componente. En esta ocación he requerido tener consideración los tipos en relación a los argumentos y datos de retorno, cosa que me permite controlar casos de prueva y encontrar errores de forma más rápida y precisa.

## instalación y ejecución
La instalación de cada dependencia fue realizada con le manejador de paquetes __pnpm__, por ello los comandos que recomiendo para instalar las dendencias siguen el uso de este, sin embargo, tanto npm como pnpm comparten repositorio de modulos de node, puedes usar el pque prefieras, pero como dije mi recomencación es pnpm:
- para instalación de dependencias:
~~~bash
pnpm install
~~~
- para ejecución de la versión de desarrollo
~~~bash
pnpm dev
~~~
- para construcción de versión de producción
~~~bash
pnpm build
~~~
__Y como alternativa:__
- para instalación de dependencias:
~~~bash
npm install
~~~
- para ejecución de la versión en desrrollo
~~~bash
npm run dev
~~~
- para construcción de versión de producción
~~~bash
npm run build
~~~
