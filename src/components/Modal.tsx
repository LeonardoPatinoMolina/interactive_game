import React from "react";
import { LootType } from "../types/globals";

interface ModalProps {
  loot: LootType;
  title: string;
  children?: JSX.Element[] | JSX.Element | string;
  options: { content: string; choice: any }[];
  confirmM: (event: React.MouseEvent<HTMLElement>) => void;
}
/**
 * Modal sencillo que recibe como props el la configuración (loot),
 *  el titulo(title), el cuerpo del modal (children) y la función para responder
 * la confirmación (confirmM) 

*/
export const Modal: React.FC<ModalProps> = ({
  loot,
  title,
  children,
  confirmM,
  options,
}) => {
  return (
    <>
      {loot.isOpen && (
        <div className="modal_wrapper" onClick={confirmM}>
          <div className="modal">
            <h2>{title}</h2>
            {children && <div className="modal__body">{children}</div>}
            <ul className="modal__options">
              {options.map((o, i) => (
                <li
                  key={i}
                  onClick={confirmM}
                  className="modal__options__item"
                  data-choice={o.choice}
                >
                  {o.content}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
