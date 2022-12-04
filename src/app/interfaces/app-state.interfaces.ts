import { IQuestionInfo } from './question.interfaces';

export interface IListOfQuestionsData {
  pending: boolean;
  error: string;
  listOfQuestions: IQuestionInfo[];
}

export interface IAppState {
  questions: IListOfQuestionsData;
}
