import { Injectable } from '@angular/core';

import { routerManagement } from './router-management.service';
import { localStorageService } from './local-storage.service';
import { IQuestionInfo } from '../interfaces/question.interfaces';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private router: routerManagement, private localStorage: localStorageService) {}

  getQuestionCards(): Observable<IQuestionInfo[]> {
    return new Observable(subscriber => subscriber.next(this.localStorage.getData().listOfQuestions));
  }

  addQuestion(question: IQuestionInfo): Observable<IQuestionInfo[]> {
    this.updateQuestionCards([question, ...this.localStorage.getData().listOfQuestions]);
    return new Observable(subscriber => subscriber.next([question, ...this.localStorage.getData().listOfQuestions]));
  }

  editQuestion(question: IQuestionInfo, index: number): Observable<IQuestionInfo[]> {
    this.updateQuestionCards(
      this.localStorage.getData().listOfQuestions.map((val, i) => (i === index ? question : val)),
    );
    return new Observable(subscriber =>
      subscriber.next(this.localStorage.getData().listOfQuestions.map((val, i) => (i === index ? question : val))),
    );
  }

  deleteQuestion(index: number): Observable<IQuestionInfo[]> {
    this.updateQuestionCards(this.localStorage.getData().listOfQuestions.filter((value, i) => i !== index));
    return new Observable(subscriber => subscriber.next(this.localStorage.getData().listOfQuestions));
  }

  answerQuestion(questions: IQuestionInfo[]): Observable<IQuestionInfo[]> {
    this.localStorage.setData(questions);
    return new Observable(subscriber => subscriber.next(this.localStorage.getData().listOfQuestions));
  }

  updateQuestionCards(newStateOfList: IQuestionInfo[]) {
    this.localStorage.setData(newStateOfList);
    this.router.moveTo('');
  }
}
