import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { QuestionCount } from '../../adapters/QuestionCount';

export const apiVerifyConfig = createApi({
  reducerPath: "verifyconfig",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://opentdb.com/api_count.php' }),
  endpoints: (builder)=>({
    getVerifyConfig: builder.query<any, string>({
      query: (category)=>`?category=${category}`,
      transformResponse: (response: any)=>{
        if(response){
          return new QuestionCount(response).data;
        }else throw new Error('No hay respuesta valida a la configuracion actual')
      }
    }),
  })
});

export const { useGetVerifyConfigQuery } = apiVerifyConfig;
//     `https://opentdb.com/api_count.php?category=9&encode=base64`
