import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { QuestionsAdapter } from "../../adapters/Question";
import { GetQuestionsUrlI } from "../../services/endpoints";

export interface QuestionData {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
}

export const questionApi = createApi({
  reducerPath: 'questionApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://opentdb.com/api.php'}),
  endpoints: (builder)=>({
    getQuestion: builder.query<any, GetQuestionsUrlI>({
      query: ({amount, category, difficulty}) => {
        return `?amount=${amount}&category=${category}&difficulty=${difficulty}&type=boolean&encode=base64`
      },
      transformResponse: (response: any)=>{
        if(response.results.length === 0) throw new Error('no hay resultados')
        const decodeData = new QuestionsAdapter(response).questions;
        return decodeData
      }
    }),
  })
})

export const { useGetQuestionQuery } = questionApi;


// `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=boolean`