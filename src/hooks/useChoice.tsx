import React, { useRef } from "react";
import { Vector } from "../types/globals";

type useChoiceArgs = {
  target: HTMLElement;
  positionTarget: Vector
};
type useChoiceReturns = {
  check: () => boolean | undefined;
  refChoiceTrue: React.MutableRefObject<HTMLElement | undefined>;
  refChoiceFalse: React.MutableRefObject<HTMLElement | undefined>;
};

export const useChoice = ({ target, positionTarget }: useChoiceArgs): useChoiceReturns => {
  const contentTrueRef = useRef<HTMLElement>();
  const contentFalseRef = useRef<HTMLElement>();

  const checkChoice = (): boolean | undefined => {
    if(!target) return;
    if(!contentTrueRef.current || !contentFalseRef.current) return;
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
    const rectTrue = contentTrueRef.current.getBoundingClientRect();
    const rectFalse = contentFalseRef.current.getBoundingClientRect();
    let choice = undefined;
    if (
      centerOftarget.x > rectTrue?.left! &&
      centerOftarget.x < rectTrue?.right! &&
      centerOftarget.y < rectTrue?.bottom! &&
      centerOftarget.y > rectTrue?.top!
    ) {
      choice = true;
    }
    if (
      centerOftarget.x > rectFalse?.left! &&
      centerOftarget.x < rectFalse?.right! &&
      centerOftarget.y < rectFalse?.bottom! &&
      centerOftarget.y > rectFalse?.top!
    ) {
      choice = false;
    }
    return choice;
  }; //end checkChoice

  return {
    check: checkChoice,
    refChoiceTrue: contentTrueRef,
    refChoiceFalse: contentFalseRef,
  };
};
