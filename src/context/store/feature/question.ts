import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from '../../../adapters/Question';
import { GetAnyQuestionsUrlI, GetQuestionsUrlI } from '../../../services/endpoints';
import { generateRandomInt } from '../../../utilities/utils';

export type QuestionState = {
  config: GetQuestionsUrlI | GetAnyQuestionsUrlI;
}

const initialState: QuestionState = {
  config: {
    amount: '10',
    category: '9',
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
      state.config = {amount: `${generateRandomInt(1,50)}`}
      return state;
    }
  }
});
export const { setConfigQuestion, setAnyConfigQuestion} = questionSlice.actions;
export default questionSlice.reducer