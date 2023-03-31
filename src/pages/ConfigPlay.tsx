import React, { useState } from "react";
import { BsFillCaretLeftFill, BsPlusCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../assets/categories.json";
import { Footer } from "../components/Footer";
import { Modal } from "../components/Modal";
import { useAppDispatch } from "../context/reduxHooks";
import { setConfigQuestion } from "../context/store/feature/question";
import { useModal } from "../hooks/useModal";
import { GetQuestionsUrlI } from "../services/endpoints";
import { DIFFICULTY_ES } from "../utilities/utils";

interface ConfigPLayProps {}
const initialFormState: GetQuestionsUrlI = {
  amount: "1",
  category: "9",
  difficulty: "medium",
};

const ConfigPlay: React.FC<ConfigPLayProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState<GetQuestionsUrlI>(initialFormState);
  const modalCategory = useModal({
    loot: {
      isOpen: false,
    },
  });
  const modalDifficulty = useModal({
    loot: {
      isOpen: false,
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setConfigQuestion({ config: form }));
    navigate("/playzone/custom");
  }

  const handleElection = async ({currentTarget}: React.MouseEvent<HTMLElement>) => {
    const name = currentTarget.dataset.name;
    console.log('e');
    
    let choice: string;
    if(name === 'category'){
      choice = await modalCategory.open();
    }else{
      choice = await modalDifficulty.open();
    }
    setForm((prev) => ({
      ...prev,
      [name as string]: choice,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((prev) => ({
      ...prev,
      [name as string]: value,
    }));
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
        options={[
          { choice: "easy", content: "fácil" },
          { choice: "medium", content: "media" },
          { choice: "hard", content: "difícil" },
        ]}
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
              {categories.find((c) => c.id === parseInt(form.category))?.name}
            </div>
          </label>
          <label className="configplay__form__label" htmlFor="">
            Cantidad de preguntas (min: 1 - max: 50)
            <input
              min={1}
              max={50}
              className="configplay__form__amount"
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
            />
          </label>
          <label className="configplay__form__label">
            Dificultad
            <div 
              className="configplay__form__difficulty btn_noumorfus"
              onClick={(e)=>handleElection(e)}
              data-name={"difficulty"}
            >
              {DIFFICULTY_ES[form.difficulty as "hard" | "easy" | "medium"]}
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

