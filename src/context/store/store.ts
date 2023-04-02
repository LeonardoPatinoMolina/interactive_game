import { configureStore } from '@reduxjs/toolkit'
import { apiQuestion } from '../api/apiQuestionSlice';
import questionReducer from './feature/question';

export const store = configureStore({
  reducer: {
    [apiQuestion.reducerPath]: apiQuestion.reducer,
    question: questionReducer,
  },
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(
      apiQuestion.middleware)
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch