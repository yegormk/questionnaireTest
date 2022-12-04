import { Injectable } from '@angular/core';

import { IListOfQuestions, IQuestionInfo } from '../interfaces/question.interfaces';

@Injectable({
  providedIn: 'root',
})
export class localStorageService {
  private locStorage: Storage = localStorage;

  constructor() {}

  getData(): IListOfQuestions {
    return this.isDataExists ? JSON.parse(this.locStorage.getItem('arrayOfQuestions') || '') : { listOfQuestions: [] };
  }

  get isDataExists(): boolean {
    return this.locStorage.getItem('arrayOfQuestions') !== null;
  }

  setData(questionsInfo: IQuestionInfo[]): void {
    this.locStorage.setItem('arrayOfQuestions', JSON.stringify({ listOfQuestions: questionsInfo }));
    if (this.getData().listOfQuestions.length < 1) {
      this.locStorage.removeItem('arrayOfQuestions');
    }
  }
}
