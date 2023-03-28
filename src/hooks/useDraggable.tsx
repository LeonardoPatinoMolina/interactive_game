import React, { useEffect, useRef, useState } from "react";

type Vector = { x: number; y: number };

type DeviceType = "mouse" | "touch";

export const useDraggable = (): React.MutableRefObject<HTMLElement | undefined>[] => {
  const itemDraggable = useRef<HTMLElement>();

  const [initialPosition, setInitialPosition] = useState<Vector>({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState<Vector>({ x: 0, y: 0 });
  const [offset, setOffset] = useState<Vector>({ x: 0, y: 0 });

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

  useEffect(() => {
    if (!itemDraggable.current) return;

    itemDraggable.current.style.position = 'absolute'
    
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
    setInitialPosition(()=>{
      return {x: pX - offset.x, y: pY - offset.y}
    });
    setIsMove(() => true);
  }

  function moveHandler(e: any): void {
    if (isMove) {
      e.preventDefault();
      let newX = deviceType === "mouse" ? e.clientX : e.touches[0].clientX;
      let newY = deviceType === "mouse" ? e.clientY : e.touches[0].clientY;

      if (itemDraggable.current) {
        const newPosition = {
          x: newX - initialPosition.x,
          y:  newY - initialPosition.y
        }

        setCurrentPosition(()=>{
          return {x: newPosition.x, y: newPosition.y}
        })
        setOffset(()=>{
          return {x: newPosition.x, y: newPosition.y }
        })
        const rect = itemDraggable.current.getBoundingClientRect()
        
        setTranslate(newPosition.x, newPosition.y, itemDraggable.current);
      } else {
        throw new Error("No hay referencia a itemDraggable");
      }
    }
  } //end movehandler

  function stopMove(): void {
    
    setInitialPosition(()=>{
      return {x: currentPosition.x, y: currentPosition.y}
    })
    setIsMove(() => false);
  }

  return [ itemDraggable ];
}; //end hook

function setTranslate(xPos: number, yPos: number, el: HTMLElement) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}