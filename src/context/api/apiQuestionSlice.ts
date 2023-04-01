import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { QuestionsAdapter } from "../../adapters/Question";
import { generateRandomInt } from "../../utilities/utils";

export interface QuestionData {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
}

export type ApiQuestionArgs = {
    limit: string;
    category: string;
    difficulty: string;
}

export const apiQuestion = createApi({
  reducerPath: 'questionApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://the-trivia-api.com/api/questions'}),
  endpoints: (builder)=>({
    getQuestion: builder.query<any, ApiQuestionArgs>({
      query: ({limit, category, difficulty}) => {
        return `?categories=${category}&limit=${limit}&difficulty=${difficulty}`;
      },
      transformResponse: (response: any)=>{
        if(response.length === 0) throw new Error('no hay resultados')
        const decodeData = new QuestionsAdapter(response).questions;
        return decodeData
      }
    }),
    getAnyQuestions: builder.query<any, void>({
      query: () =>{
        return `?limit=${generateRandomInt(1,20)}`;
      },
      transformResponse: (response: any)=>{
        return new QuestionsAdapter(response).questions;
      }
    }),

  })
})

export const { useGetQuestionQuery, useGetAnyQuestionsQuery } = apiQuestion;


// `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=boolean`



// https://the-trivia-api.com/api/questions?categories=food_and_drink&limit=20&difficulty=medium
