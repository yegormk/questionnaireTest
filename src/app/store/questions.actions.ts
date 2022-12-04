import { createAction, props } from '@ngrx/store';

import { IQuestionInfo } from '../interfaces/question.interfaces';

export const addQuestion = createAction('[Questions] Add question', props<{ question: IQuestionInfo }>());

export const addQuestionCardsSuccessful = createAction(
  '[Questions] Added question successfully',
  props<{ questions: IQuestionInfo[] }>(),
);

export const addQuestionCardsFailure = createAction('[Questions] Failed to add question', props<{ error: string }>());

export const deleteQuestion = createAction('[Questions] Delete question', props<{ index: number }>());

export const deleteQuestionSuccessful = createAction(
  '[Questions] Question deleted successfully',
  props<{ editedListOfQuestions: IQuestionInfo[] }>(),
);

export const deleteQuestionFailure = createAction('[Questions] Failed to delete question', props<{ error: string }>());

export const editQuestion = createAction(
  '[Questions] Edit question',
  props<{
    question: IQuestionInfo;
    index: number;
  }>(),
);

export const editQuestionSuccessful = createAction(
  '[Questions] Edited question successfully',
  props<{ editedListOfQuestions: IQuestionInfo[] }>(),
);

export const editQuestionFailure = createAction('[Questions] Failed to edit question', props<{ error: string }>());

export const getQuestionCards = createAction('[Questions] Get question');

export const getQuestionCardsSuccessful = createAction(
  '[Questions] Get question successfully',
  props<{ questions: IQuestionInfo[] }>(),
);

export const getQuestionCardsFailure = createAction('[Questions] Failed to get question', props<{ error: string }>());

export const updateQuestionCards = createAction(
  '[Questions] Update question cards',
  props<{ questions: IQuestionInfo[] }>(),
);

export const updateQuestionCardsSuccessful = createAction('[Questions] Update question cards successfully');

export const updateQuestionCardsFailure = createAction(
  '[Questions] Failed to update question cards',
  props<{ error: string }>(),
);
