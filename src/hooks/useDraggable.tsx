import React, { useEffect, useRef, useState } from "react";
import { Aligment, Vector } from "../types/globals";

type useDraggableArgs = {
  position?: Vector;
  aligment?: Aligment
}
type useDraggableReturns = [
  item: React.MutableRefObject<HTMLElement | undefined>,
  changePosition: (position: Aligment)=>void
]
type DeviceType = "mouse" | "touch";

const EVENTS: Record<DeviceType, { down: string; move: string; up: string }> =
{
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

export const useDraggable = (args: useDraggableArgs): useDraggableReturns => {
  
  //item que será retornado comarreglo para referenciar el item que
  //requiera ser draggable
  const itemDraggable = useRef<HTMLElement>();
  
  const [initialPosition, setInitialPosition] = useState<Vector>({x: 0, y: 0});
  //opté por hacer la posición actual como una referencia porque
  //los estados podían dar problemas a la hora de mantenerse actualizados
  //debido a su asíncronía
  const currentPosition = useRef<Vector>();

  const [isMove, setIsMove] = useState<boolean>(false);

  const [deviceType] = useState<DeviceType>(() => {
    try {
      //creamos un evento touch, en caso de obtener error significa
      //que no estamos en un mobil
      document.createEvent("TouchEvent");
      return "touch";
    } catch (e) {
      return "mouse";
    }
  });

  //establecemos la posición inicial del item
  useEffect(() => {
    if (!itemDraggable.current) return;
    const p = geInitialState(args, itemDraggable);
    translateItem(p.x, p.y, itemDraggable.current);
    currentPosition.current = {x: p.x, y: p.y}
    itemDraggable.current.style.position = 'absolute'
  },[]);

  //controlamos todos los eventListeners de interes
  useEffect(() => {
    if (!itemDraggable.current) return;

    itemDraggable.current.addEventListener(
      EVENTS[deviceType].down,
      downHandler
    );
    itemDraggable.current.addEventListener(
      EVENTS[deviceType].move,
      moveHandler
    );
    itemDraggable.current.addEventListener(EVENTS[deviceType].up, stopMove);
    itemDraggable.current.addEventListener("mouseleave", stopMove);

    return () => {
      if (!itemDraggable.current) return;
        itemDraggable.current.removeEventListener(
          EVENTS[deviceType].down,
          downHandler
        );
        itemDraggable.current.removeEventListener(
          EVENTS[deviceType].move,
          moveHandler
        );
        itemDraggable.current.removeEventListener(
          EVENTS[deviceType].up,
          stopMove
        );
        itemDraggable.current.removeEventListener("mouseleave", stopMove);
      }
      
  }, [isMove]);

  function downHandler(e: any): void {
    e.preventDefault();
    //coordenadas inciales
    const pX = deviceType === "mouse" ? e.clientX : e.touches[0].clientX;
    const pY = deviceType === "mouse" ? e.clientY : e.touches[0].clientY;
    
    setInitialPosition(()=>({x: pX - currentPosition.current?.x!, y: pY - currentPosition.current?.y!}));
    setIsMove(() => true);
  }

  function moveHandler(e: any): void {
    if (isMove) {
      e.preventDefault();

      let newX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      let newY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

      if (itemDraggable.current) {
        const newPosition = {
          x: newX - initialPosition.x!,
          y:  newY - initialPosition.y!
        }

        currentPosition.current = {x: newPosition.x, y: newPosition.y}
        translateItem(newPosition.x, newPosition.y, itemDraggable.current);
      } else {
        throw new Error("No hay referencia a itemDraggable");
      }
    }
  } //end movehandler

  function stopMove(): void {
    
    setInitialPosition(()=>{
      return {x: currentPosition.current?.x!, y: currentPosition.current?.y!}
    })
    setIsMove(() => false);
  }

  //función encargada de cambiar la ubicacion del item desde afuera por
  //alineamiento
  function changePosition(position: Aligment){
    const pos = geInitialState({aligment: position}, itemDraggable);
    translateItem(pos.x, pos.y,itemDraggable?.current!);
    currentPosition.current = {x: pos.x, y: pos.y}
  }

  return [ itemDraggable, changePosition];
}; //end hook


//UTILIDADES DEL HOOK--------------------------------------------------------------
/**
 * Encargada de transformar el elemento trasladándolo a la posicion que se le atribuya
 */
function translateItem(xPosition: number, yPosition: number, element: HTMLElement) {
  element.style.transform = `translate3d(${xPosition}px, ${yPosition}px, 0)`;
}

/**
 * Encargada de establecer el vector inicial según se requiera
 * este vector determina la posición en la que se encontrará el item por vez primera
 * según se estipule en los argumentos del hook
 */
function geInitialState(
    args: useDraggableArgs, 
    item: React.MutableRefObject<HTMLElement | undefined>,
  ): Vector {
  if(!args)return {x: 0, y: 0}
  else if(args.position){
    return args.position;
  }
  else{
    const itemWidth = item.current?.offsetWidth;
    const itemHeight = item.current?.offsetHeight;
    
    switch (args.aligment) {
      case 'center':
        return {
          x: (window.innerWidth - itemWidth!) / 2, 
          y: (window.innerHeight - itemHeight!) / 2
        };
        
      case 'centerbottom':
        return {
          x: (window.innerWidth - itemWidth!) / 2, 
          y: (window.innerHeight - itemHeight!)
        }
      case 'centerleft':
        return {
          x: 0, 
          y: (window.innerHeight - itemHeight!) / 2
        }
      case 'centerright':
        return {
          x: window.innerWidth - itemWidth!, 
          y: (window.innerHeight - itemHeight!) / 2
        }
      case 'centertop':
        return {
          x: (window.innerWidth - itemWidth!) / 2, 
          y: 0
        }
      case 'topleft':
        return {
          x: 0, 
          y: 0
        }
      case 'topright':
        return {
          x: (window.innerWidth - itemWidth!), 
          y: 0
        }
      case 'bottomleft':
        return {
          x: 0, 
          y: window.innerHeight - itemHeight!
        }
      case 'bottomright':
        return {
          x: window.innerWidth - itemWidth!, 
          y: window.innerHeight - itemHeight!
        }
      default:
        throw new Error('Argumento no valido en useDraggable Hook')
    }//end switch
  }//end else
}//end geInitialState