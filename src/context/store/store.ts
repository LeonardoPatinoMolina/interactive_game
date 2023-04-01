import { configureStore } from '@reduxjs/toolkit'
import { apiQuestion } from '../api/apiQuestionSlice';
import { apiVerifyConfig } from '../api/apiVerifyCofigSlice';
import questionReducer from './feature/question';

export const store = configureStore({
  reducer: {
    [apiQuestion.reducerPath]: apiQuestion.reducer,
    [apiVerifyConfig.reducerPath]: apiVerifyConfig.reducer,
    question: questionReducer,
  },
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(
      apiQuestion.middleware, 
      apiVerifyConfig.middleware)
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch