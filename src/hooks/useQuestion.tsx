import { useEffect, useState } from "react";
import { Question } from "../adapters/Question";
import {
  useGetAnyQuestionsQuery,
  useGetQuestionQuery,
} from "../context/api/apiSlice";
import { useAppSelector } from "../context/reduxHooks";
import { GetAnyQuestionsUrlI, GetQuestionsUrlI } from "../services/endpoints";

type useQuestionArgs = {
  type: "any" | "custom";
  params?: GetQuestionsUrlI | GetAnyQuestionsUrlI;
};

type useQuestionReturns = {
  isSuccess: boolean;
  isError: boolean; 
  isLoading: boolean;
  allQuestions: Question[] | undefined
  question: Question | undefined;
  generator: Generator | undefined;
}

export const useQuestion: any = (args: useQuestionArgs): useQuestionReturns => {
  const { config } = useAppSelector((state) => state.question);
  const [generator, setGenerator] = useState<Generator>();
  const [question, setQuestion] = useState<Question>();

  const FETCH = {
    any: useGetAnyQuestionsQuery,
    custom: useGetQuestionQuery,
  } as { any: any; custom: any };

  const { data, isSuccess, isError, isLoading } = FETCH[args.type](config);

  function* nextQ() {
    for (const q of data) {
      yield setQuestion(q);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      const gen = nextQ();
      gen.next();
      setGenerator(() => gen);
    }
  }, [isSuccess]);

  return { isSuccess, isError, isLoading, allQuestions: data, question, generator };
};
