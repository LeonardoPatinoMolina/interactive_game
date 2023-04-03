import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiQuestionArgs } from '../../api/apiQuestionSlice';

export type QuestionState = {
  config: ApiQuestionArgs | string;
}

const initialState: QuestionState = {
  config: {
    limit: '1',
    category: 'general_knowledge',
    difficulty: 'easy'
  }
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setConfigQuestion: (state: QuestionState, action: PayloadAction<QuestionState>) => {
      state.config = action.payload.config
      return state;
    },
  }
});
export const { setConfigQuestion } = questionSlice.actions;
export default questionSlice.reducer