import React, { useState } from "react";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../assets/categories.json";
import { Footer } from "../components/Footer";
import { Modal } from "../components/Modal";
import { ApiQuestionArgs } from "../context/api/apiQuestionSlice";
import { useAppDispatch } from "../context/reduxHooks";
import { setConfigQuestion } from "../context/store/feature/question";
import { useModal } from "../hooks/useModal";
import difficult__es from '../assets/difficult_es.json'

interface ConfigPLayProps {}

const ConfigPlay: React.FC<ConfigPLayProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState<ApiQuestionArgs>({
    limit: "1",
    category: "general_knowledge",
    difficulty: "easy",
  });
  const modalCategory = useModal({ isOpen: false });
  const modalDifficulty = useModal({ isOpen: false });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setConfigQuestion({ config: form }));
    navigate("/playzone/custom");
  }

  const handleElection = async ({
    currentTarget
  }: React.MouseEvent<HTMLElement>) => {
    const name = currentTarget.dataset.name;
    let choice: string | undefined = undefined;
    if (name === "category") {
      choice = await modalCategory.open();
    } else if (name === "difficulty") {
      choice = await modalDifficulty.open();
    }
    if (choice) {
      setForm((prev) => ({ ...prev, [name as string]: choice }));
    }
  };

  const handleArrows = (e: React.MouseEvent<HTMLElement>) => {
    const ar = e.currentTarget.dataset.arrow;
    setForm((prevState) => {
      if(prevState.limit === '') return {...prevState, limit: "0"}
      const limitInt = parseInt(prevState.limit);
      let newLimit: number;
      if (ar === "left") {
        if (limitInt <= 1) return prevState;
        newLimit = limitInt - 1;
      } else {
        if (limitInt >= 20) return prevState;
        newLimit = limitInt + 1;
      }
      return {
        ...prevState,
        limit: newLimit.toString(),
      };
    });
  };

  return (
    <>
      <Modal
        title="Categoría"
        confirmM={modalCategory.close}
        loot={modalCategory.loot}
        options={categories.map((c) => ({ choice: c.id, content: c.name }))}
      />
      <Modal
        title="Dificultad"
        confirmM={modalDifficulty.close}
        loot={modalDifficulty.loot}
        options={Object.entries(difficult__es).map(([k,v])=>({choice: k, content: v}))}
      />
      <section className="configplay">
        <h1 className="configplay__title">Configurar partida</h1>
        <form className="configplay__form" onSubmit={handleSubmit}>
          <label className="configplay__form__label">
            Categoría
            <div
              className="configplay__form__category btn_noumorfus"
              onClick={handleElection}
              data-name="category"
            >
              {categories.find((c) => c.id === form.category)?.name}
            </div>
          </label>
          <label className="configplay__form__label" htmlFor="">
            Cantidad de preguntas <br /> (min: 1 - max: 20)
            <div className="configplay__form__amount_wrapper">
              <div
                className="configplay__form__amount__left"
                data-arrow="left"
                onClick={handleArrows}
              >
                <BsFillCaretLeftFill />
              </div>
              <input
                min={1}
                max={20}
                className="configplay__form__amount"
                type="number"
                name="limit"
                required
                value={form.limit}
                onChange={({target})=>setForm((prev) => ({ ...prev, [target.name]: target.value }))}
              />
              <div
                className="configplay__form__amount__right"
                onClick={handleArrows}
                data-arrow="right"
              >
                <BsFillCaretRightFill />
              </div>
            </div>
          </label>
          <label className="configplay__form__label">
            Dificultad
            <div
              className="configplay__form__difficulty btn_noumorfus"
              onClick={handleElection}
              data-name={"difficulty"}
            >
              {
                difficult__es[
                  form.difficulty as keyof (typeof difficult__es)
                ]
              }
            </div>
          </label>
          <div className="configplay__form__bottom">
            <Link to="/" className="configplay__form__btn btn_noumorfus">
              <BsFillCaretLeftFill />
              Volver a inicio
            </Link>
            <button
              className="configplay__form__btn btn_noumorfus"
              type="submit"
            >
              Confirmar
            </button>
          </div>
        </form>
        <Footer />
      </section>
    </>
  );
};

export { ConfigPlay };