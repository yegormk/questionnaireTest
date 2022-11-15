import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IListOfQuestions, IQuestionInfo } from '../interfaces/question.interfaces';

@Injectable({
  providedIn: 'root',
})
export class localStorageService {
  private locStorage: Storage = localStorage;
  constructor(private router: Router) {}

  setQuestionCard(questionInfo: IQuestionInfo, index: number = -1) {
    if (this.isDataExists()) {
      const oldListOfQuestions = this.getQuestionCards();
      index === -1
        ? oldListOfQuestions.listOfQuestions.splice(0, 0, questionInfo)
        : oldListOfQuestions.listOfQuestions.splice(index, 1, questionInfo);
      this.locStorage.setItem('arrayOfQuestions', JSON.stringify(oldListOfQuestions));
    } else {
      this.locStorage.setItem('arrayOfQuestions', JSON.stringify({ listOfQuestions: [questionInfo] }));
    }
    this.moveTo('');
  }

  getQuestionCards(): IListOfQuestions {
    return JSON.parse(this.locStorage.getItem('arrayOfQuestions') || '');
  }

  updateQuestionCards(newStateOfList: IListOfQuestions) {
    this.locStorage.setItem('arrayOfQuestions', JSON.stringify(newStateOfList));
    if (this.getQuestionCards().listOfQuestions.length < 1) {
      this.locStorage.removeItem('arrayOfQuestions');
    }
  }

  isDataExists(): boolean {
    return this.locStorage.getItem('arrayOfQuestions') !== null;
  }

  moveTo(path: string) {
    this.router.navigate([path]);
  }
}
