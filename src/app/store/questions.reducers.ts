import { createReducer, on } from '@ngrx/store';

import * as QuestionsActions from './questions.actions';
import { IListOfQuestionsData } from '../interfaces/app-state.interfaces';

const initialStateQuestions: IListOfQuestionsData = {
  pending: false,
  error: '',
  listOfQuestions: [],
};

export const getQuestionsReducer = createReducer(
  initialStateQuestions,
  on(QuestionsActions.getQuestionCards, state => {
    return {
      ...state,
      pending: true,
    };
  }),
  on(QuestionsActions.getQuestionCardsSuccessful, (state, { questions }) => {
    return {
      ...state,
      listOfQuestions: questions,
      pending: false,
    };
  }),
  on(QuestionsActions.getQuestionCardsFailure, (state, { error }) => {
    return {
      ...state,
      pending: false,
      error: error,
    };
  }),
  on(QuestionsActions.addQuestion, (state, { question }) => {
    return {
      ...state,
      pending: true,
    };
  }),
  on(QuestionsActions.addQuestionCardsSuccessful, (state, { questions }) => {
    return {
      ...state,
      listOfQuestions: questions,
      pending: false,
    };
  }),
  on(QuestionsActions.addQuestionCardsFailure, (state, { error }) => {
    return {
      ...state,
      pending: false,
      error: error,
    };
  }),
  on(QuestionsActions.editQuestion, (state, { question, index }) => {
    return {
      ...state,
      pending: true,
    };
  }),
  on(QuestionsActions.editQuestionSuccessful, state => {
    return {
      ...state,
      pending: false,
    };
  }),
  on(QuestionsActions.editQuestionFailure, (state, { error }) => {
    return {
      ...state,
      pending: false,
      error: error,
    };
  }),
  on(QuestionsActions.deleteQuestion, (state, { index }) => {
    return {
      ...state,
      pending: true,
    };
  }),
  on(QuestionsActions.deleteQuestionSuccessful, (state, { editedListOfQuestions }) => {
    return {
      ...state,
      pending: false,
      listOfQuestions: editedListOfQuestions,
    };
  }),
  on(QuestionsActions.deleteQuestionFailure, (state, { error }) => {
    return {
      ...state,
      pending: false,
      error: error,
    };
  }),
  on(QuestionsActions.updateQuestionCards, (state, { questions }) => {
    return {
      ...state,
      listOfQuestions: questions,
    };
  }),
  on(QuestionsActions.updateQuestionCardsSuccessful, state => {
    return {
      ...state,
      pending: false,
    };
  }),
  on(QuestionsActions.updateQuestionCardsFailure, (state, { error }) => {
    return {
      ...state,
      pending: false,
      error: error,
    };
  }),
);
