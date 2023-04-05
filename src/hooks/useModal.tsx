import { useState, useEffect } from "react";
import { LootType } from "../types/globals";
import { MyEventMediator } from "../utilities/emitter";

type useModalReturns = {
  loot: LootType
  open: () => Promise<any>;
  close: (event: React.MouseEvent<HTMLElement>) => void;
}

export const useModal = (initialConfig: LootType): useModalReturns => {
  /**
   * El estado controller consiste en un mediadr de eventos que será el encargado
   * de notificar cuando la ventana modal obtenga una acción mediante el usuario
   */
  const [controller] = useState<MyEventMediator>(new MyEventMediator());
  /**
   * El estado loot es la configuracíón general del modal, entre esta se encuentra
   * el booleando encargado no hacer seguimiento a la apertura o cierre del mismo 
   */
  const [loot, setLoot] = useState<LootType>(initialConfig);
  
  useEffect(() => {
    return () => {
      //nos aseguramos que todo evento pendiente sea removido al des-renderizar componente
      if(controller) controller.offAll();
    };
  }, []);

  /**
   * El principio es simple, esta función no se resolverá por si sola sino que lo hará por
   * demanda, es decir, para que esta función cumpla su cometido necesita de la 
   * participación de otra función, en este caso, la afunción "confirmM", y hasta entonces 
   * el scope donde se le invoque, no resibirá respuesta de ella.
   * Naturalmente, el retorno consiste en una promesa que al resolverse contendrá el dato de interés
   */
  function showM(): Promise<any> {
    setLoot({...loot, isOpen: true});//abrimos el modal
    
    /**
     * A través del controllador subscribimos un observer al evento "modal-action"
     * esto con el propósito de resolver la promesa mediante su eventual ejecución. 
     * La promesa resolverá un dato que recibirá por medio del evento, este representa
     * información de interés enviada desde la función cofirmM
     */
    return new Promise((resolve) => {
      controller.on('modal-action', (evnt: CustomEvent)=>{
        resolve(evnt.detail ?? "")
      })
    });
  }

  /**
   * Esta función se encarga de disparar el evento con el dato de interés
   * en este caso se trata de la elección que deviene desde un dataset en un elemento 
   * que ejecuta la función en su evento click
   */
  function confirmM(choice: any): void {
    setLoot({...loot, isOpen: false});//cerramos el modal
    controller.emit<any>('modal-action',choice);
  }
  //la responsabilidad de implementar la función showM está a manos del compoentne donde se 
  //declare el hook, 
  //En cuanto al loot y el confirmM, estos serán responsabilidad del Componente Modal
  return {loot, open: showM, close: confirmM};
}