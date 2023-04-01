import React, { useRef } from "react";
import { Vector } from "../types/globals";

type useChoiceArgs = {
  target: HTMLElement;
  positionTarget: Vector;
};
type useChoiceReturns = {
  check: () => string | undefined;
  refChoiceOne: React.MutableRefObject<HTMLElement | undefined>;
  refChoiceTwo: React.MutableRefObject<HTMLElement | undefined>;
};

export const useChoice = ({ target, positionTarget}: useChoiceArgs): useChoiceReturns => {
  const contentOneRef = useRef<HTMLElement>();
  const contentTwoRef = useRef<HTMLElement>();

  const checkChoice = (): string | undefined => {
    if(!target) return;
    if(!contentOneRef.current || !contentTwoRef.current) return;
    /**
     * optenemos el centro del item target,
     * esto para asegurarnos de la confirmación de la
     * elección justo en la parte central de la card
     */
    const dimTarget: Vector = {
      x: target.offsetWidth,
      y: target.offsetHeight,
    };
    const centerOftarget = {
      x: positionTarget.x + dimTarget.x / 2,
      y: positionTarget.y + dimTarget.y / 2,
    };
    const rectOne = contentOneRef.current.getBoundingClientRect();
    const rectTwo = contentTwoRef.current.getBoundingClientRect();
    let choice = undefined;
    if (
      centerOftarget.x > rectOne?.left! &&
      centerOftarget.x < rectOne?.right! &&
      centerOftarget.y < rectOne?.bottom! &&
      centerOftarget.y > rectOne?.top!
    ) {
      choice = contentOneRef.current?.firstElementChild?.innerHTML;
    }
    if (
      centerOftarget.x > rectTwo?.left! &&
      centerOftarget.x < rectTwo?.right! &&
      centerOftarget.y < rectTwo?.bottom! &&
      centerOftarget.y > rectTwo?.top!
    ) {
      choice = contentTwoRef.current?.firstElementChild?.innerHTML;
    }
    return choice;
  }; //end checkChoice

  return {
    check: checkChoice,
    refChoiceOne: contentOneRef,
    refChoiceTwo: contentTwoRef,
  };
};
