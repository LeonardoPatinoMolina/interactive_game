import React, { useEffect, useRef, useState } from "react";
import { Aligment, Vector } from "../types/globals";

type useDraggableArgs = {
  position?: Vector;
  aligment?: Aligment;
}
type useDraggableReturns = [
  item: React.MutableRefObject<HTMLElement | undefined>,
  changePosition: (position: Aligment)=>void,
  currentPosition: Vector
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

/**
 * Hook encargado de controlar la caracteristica drag de un item determinado 
 */
export const useDraggable = (args: useDraggableArgs): useDraggableReturns => {
  
  //item que será retornado coma rreglo para referenciar el item que
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
    let initialPosition: Vector;
    if(!args) {
      initialPosition = {x: 0, y: 0}
    }
    else if(args.position){
      initialPosition = args.position;
    }
    else{
      initialPosition = getAligmentPosition(args?.aligment!, itemDraggable);
    }
    translateItem(initialPosition.x, initialPosition.y, itemDraggable.current);
    currentPosition.current = {x: initialPosition.x, y: initialPosition.y}
    itemDraggable.current.style.position = 'absolute'
  },[itemDraggable.current]);

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
      
  }, [isMove, itemDraggable.current]);

  function downHandler(e: any): void {
    e.preventDefault();
    //coordenadas inciales
    const pX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const pY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
    
    setInitialPosition(()=>({x: pX - currentPosition.current?.x!, y: pY - currentPosition.current?.y!}));
    setIsMove(() => true);
  }

  function moveHandler(e: any): void {
    if (isMove) {
      e.preventDefault();
      if((currentPosition.current?.x! + itemDraggable.current?.offsetWidth!) >= window.innerWidth - 6 || 
      currentPosition.current?.y! + itemDraggable.current?.offsetHeight! >= window.innerHeight - 6){
        console.log('mm');
        
        const newPos = getAligmentPosition("center", itemDraggable);
        translateItem(newPos.x, newPos.y, itemDraggable?.current!);
        currentPosition.current = {x: newPos.x, y: newPos.y}
        setInitialPosition(()=>newPos);
        return;
      }
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
    const pos = getAligmentPosition(position, itemDraggable);
    translateItem(pos.x, pos.y,itemDraggable?.current!);
    currentPosition.current = {x: pos.x, y: pos.y}
  }

  return [ itemDraggable, changePosition, currentPosition.current!];
}; //end hook


//UTILIDADES DEL HOOK--------------------------------------------------------------
/**
 * Encargada de transformar el elemento trasladándolo a la posicion que se le atribuya
 */
function translateItem(xPosition: number, yPosition: number, element: HTMLElement) {
  element.style.transform = `translate3d(${xPosition}px, ${yPosition}px, 0)`;
}

/**
 * Encargada de establecer un vector según se estipule mediante
 * el dato aligment
 */
function getAligmentPosition(
    aligment: Aligment, 
    item: React.MutableRefObject<HTMLElement | undefined>,
  ): Vector {
    const itemWidth = item.current?.offsetWidth;
    const itemHeight = item.current?.offsetHeight;
    const headerOffset = 35;
    switch (aligment) {
      case 'center':
        return {
          x: (window.innerWidth - itemWidth!) / 2, 
          y: ((window.innerHeight - itemHeight!) / 2) + headerOffset
        };
        
      case 'centerbottom':
        return {
          x: (window.innerWidth - itemWidth!) / 2, 
          y: (window.innerHeight - itemHeight!)
        }
      case 'centerleft':
        return {
          x: 0, 
          y: ((window.innerHeight - itemHeight!) / 2) + headerOffset
        }
      case 'centerright':
        return {
          x: window.innerWidth - itemWidth!, 
          y: ((window.innerHeight - itemHeight!) / 2) + headerOffset
        }
      case 'centertop':
        return {
          x: (window.innerWidth - itemWidth!) / 2, 
          y: headerOffset
        }
      case 'topleft':
        return {
          x: 0, 
          y: headerOffset
        }
      case 'topright':
        return {
          x: (window.innerWidth - itemWidth!), 
          y: headerOffset
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
}//end geInitialState