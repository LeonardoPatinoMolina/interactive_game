import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type QuestionState = {
  body: string;
  difficulty: string;
  category: number;
  correct_answer: boolean;
  wrong_answer: boolean;
}

const initialState: QuestionState = {
  body: '',
  category: 9,
  difficulty: 'easy',
  correct_answer: false,
  wrong_answer: true
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestion: (state, action: PayloadAction<QuestionState>)=>{
      state = action.payload
      return state
    }
  }
});
export const {setQuestion} = questionSlice.actions;
export default questionSlice.reducer