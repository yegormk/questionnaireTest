export interface IOption {
  option: string;
  isRight: boolean;
  isChosen: boolean;
}

export interface IQuestionInfo {
  question: string;
  typeOfQuestion: string;
  listOfOptions: IOption[];
  isAnswered: boolean;
  dateOfCreation: Date;
}

export interface IListOfQuestions {
  listOfQuestions: IQuestionInfo[];
}
