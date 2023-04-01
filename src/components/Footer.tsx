"use client"
import React, {useState} from "react";
import {SiGmail} from 'react-icons/si'
import {BsGithub, BsLinkedin} from 'react-icons/bs'


export const Footer: React.FC = () => {
  const [copied, setCopied] = useState<boolean>();

  const handleClickGmail= ({currentTarget}: React.MouseEvent<HTMLElement>)=>{
    setCopied(true)
    navigator.clipboard.writeText(currentTarget.innerText)
      .then(()=>{
        setTimeout(()=>{
          setCopied(false);
        },800);
      })
      .catch((err)=>console.log(err));
  };

  return (
    <footer className='footer'>
      <ul className='footer__list'>
        <li className='footer__list__item'>
          <div className={`footer__modal ${copied && 'copied'}`}>¡Copiado!</div>
          <span title="Copiar" onClick={(e)=>handleClickGmail(e)}><SiGmail size={25} className='footer__list__item__icon' />
            leonardopatino99@gmail.com
          </span>
          </li>
        <li className='footer__list__item'>
          <a href="https://github.com/LeonardoPatinoMolina" target="_blank" rel="noopener noreferrer">
          <BsGithub 
            size={25} 
            className='footer__list__item__icon' 
          />LeonardoPatinoMolina
          </a>
        </li>
        <li className='footer__list__item'>
          <a href="https://www.linkedin.com/in/leonardo-fabio-pati%C3%B1o-molina-98802a213" target="_blank" rel="noopener noreferrer">
          <BsLinkedin size={25} className='footer__list__item__icon' />Leonardo Fabio Patiño Molina
          </a>
        </li>
      </ul>
    </footer>
  );
}
