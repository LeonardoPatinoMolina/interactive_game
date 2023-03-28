import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { questionApi } from '../api/apiSlice';
import questionReducer from './feature/question';

export const store = configureStore({
  reducer: {
    [questionApi.reducerPath]: questionApi.reducer,
    question: questionReducer,
  },
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(questionApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch