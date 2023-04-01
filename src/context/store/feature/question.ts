import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateRandomInt } from '../../../utilities/utils';
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
    setAnyConfigQuestion: (state: QuestionState, action: PayloadAction<QuestionState>) => {
      state.config = `${generateRandomInt(1,20)}`
      return state;
    }
  }
});
export const { setConfigQuestion, setAnyConfigQuestion} = questionSlice.actions;
export default questionSlice.reducer