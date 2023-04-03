import { useEffect, useState } from "react";
import { Question } from "../adapters/Question";
import {
  ApiQuestionArgs,
  useGetAnyQuestionsQuery,
  useGetQuestionQuery,
} from "../context/api/apiQuestionSlice";
import { useAppSelector } from "../context/reduxHooks";
import { generateRandomInt } from "../utilities/utils";

type useQuestionArgs = {
  type: "any" | "custom";
  params?: ApiQuestionArgs | string;
};

type useQuestionReturns = {
  isSuccess: boolean;
  isError: boolean; 
  isLoading: boolean;
  allQuestions: Question[] | undefined
  question: Question | undefined;
  generator: Generator | undefined;
  options: {
    one: string , 
    two: string
  }
}

/**
 * 
 * @param {useQuestionArgs} args 
 * @returns {useQuestionReturns}
 */
export const useQuestion: any = (args: useQuestionArgs): useQuestionReturns => {
  const { config } = useAppSelector((state) => state.question);
  const [generator, setGenerator] = useState<Generator>();
  const [options, setOptions] = useState<{one: string, two: string}>({
    one: '',
    two: ''
  });
  const [question, setQuestion] = useState<Question>();

  const FETCH = {
    any: useGetAnyQuestionsQuery,
    custom: useGetQuestionQuery,
  } as { any: any; custom: any };

  const { data, isSuccess, isError, isLoading } = FETCH[args.type](config);

  function* nextQ() {
    for (const q of data) {
      setOptions(()=>{
        if(generateRandomInt(1,2) === 1){
          return {
            one: q.correctAnswer,
            two: q.incorrectAnswers[generateRandomInt(0,q.incorrectAnswers.length - 1)]
          }
        }else{
          return {
            two: q.correctAnswer,
            one: q.incorrectAnswers[generateRandomInt(0,q.incorrectAnswers.length - 1)]
          }
    
        }
      });
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


  return { 
    isSuccess, 
    isError, 
    isLoading, 
    allQuestions: data, 
    question, 
    options,
    generator };
};
