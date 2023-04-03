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
  const modalCategory = useModal({ loot: { isOpen: false } });
  const modalDifficulty = useModal({ loot: { isOpen: false } });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setConfigQuestion({ config: form }));
    navigate("/playzone/custom");
  }

  const handleElection = async ({
    currentTarget,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleArrows = (e: React.MouseEvent<HTMLElement>) => {
    const ar = e.currentTarget.dataset.arrow;
    setForm((prev) => {
      const limitInt = parseInt(prev.limit);
      let newLimit: number;
      if (ar === "left") {
        if (limitInt <= 1) return prev;
        newLimit = limitInt - 1;
      } else {
        if (limitInt >= 20) return prev;
        newLimit = limitInt + 1;
      }
      return {
        ...prev,
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
                onChange={handleChange}
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
              onClick={(e) => handleElection(e)}
              data-name={"difficulty"}
            >
              {
                difficult__es[
                  form.difficulty as "hard" | "easy" | "medium"
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