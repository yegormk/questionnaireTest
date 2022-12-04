import { createSelector } from '@ngrx/store';

import { IAppState, IListOfQuestionsData } from '../interfaces/app-state.interfaces';

export const selectAllQuestions = createSelector(
  (state: IAppState) => state.questions,
  (state: IListOfQuestionsData) => state,
);
