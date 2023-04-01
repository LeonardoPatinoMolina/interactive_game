import { useState, useEffect } from "react";
import { LootType } from "../types/globals";
import { MyEventMediator } from "../utilities/emitter";

type useModalArgs = {
  loot: LootType
}
type useModalReturns = {
  loot: LootType
  open: () => Promise<any>;
  close: (event: React.MouseEvent<HTMLElement>) => void;
}



export const useModal = (initialConfig: useModalArgs): useModalReturns => {
  /*el estado controller no es usado por ninguna vista, sin embargo, para su maipulación se
  * está usando un callback en el initial state, lo cual es un atajo para la reactividad síncrona
  * */
  const [controller] = useState<MyEventMediator>(new MyEventMediator());

  const [loot, setLoot] = useState(initialConfig.loot);
  
  useEffect(() => {
    return () => {
      //nos aseguramos que toda promesa pendiente sea resuelta al des-renderizar componente
      if(controller) controller.offAll();
    };
  }, []);

  /**
   * El principio es simple, esta función no se resolverá por si sola sino que lo hará por
   * demanda, es decir, para que esta función cumpla su cometido necesita de la 
   * participación de otra función, en este caso, la afunción "confirmM", y hasta entonces 
   * el scope donde se le invoque, no resibirá respuesta de ella.
   * Naturalmente, el retorno consiste en una promesa que al resolverse contendrá un booleano
   */
  function showM(): Promise<any> {
    setLoot({...loot, isOpen: true});//abrimos el modal
    
    //creamos un nuevo controlador y le agregamos un eventoEscucha a su evento abort
    //al dispararse este evento se ejecutará el resolve con el contenido de
    //target.reason en la cual obtenemos la respuesta de usuario
    return new Promise((resolve) => {
      controller.on('modal-action', (evnt: CustomEvent)=>{
        resolve(evnt.detail)
      })
      //por último extraemos el controllador en un estado para manipularlo de forma externa
    });
  }

  /**
   * Esta función se encarga de disparar el evento con la eleccion
   */
  function confirmM(event: React.MouseEvent<HTMLElement>): void {
    //resolvemos la promesa disparando el evento 'abort' e inyetamos como 
    //parametro (reason) la elección del ususario
    setLoot({...loot, isOpen: false});//cerramos el modal
    let choice;
    if(!event.currentTarget.dataset.choice) choice = undefined;
    else choice = event.currentTarget.dataset.choice;
    controller.emit<any>('modal-action',choice);
  }
  //la responsabilidad de implementar la función showM está a manos del compoentne donde se 
  //declare el hook, 
  //En cuanto al loot y el confirmM, estos serán responsabilidad del Componente Modal
  return {loot, open: showM, close: confirmM};
}