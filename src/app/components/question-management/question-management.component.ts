import { Component, OnInit } from '@angular/core';

import { IListOfQuestions } from '../../interfaces/question.interfaces';
import { localStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.css'],
})
export class QuestionManagementComponent implements OnInit {
  questionCards!: IListOfQuestions;

  constructor(private service: localStorageService) {}

  ngOnInit(): void {
    if (this.isDataExists()) {
      this.questionCards = this.service.getQuestionCards();
    }
  }

  isDataExists() {
    return this.service.isDataExists();
  }

  createQuestion() {
    this.service.moveTo('/create');
  }

  answerQuestions() {
    this.service.moveTo('/lists');
  }

  editCard(index: number) {
    this.service.moveTo(`/edit/${index}`);
  }

  deleteCard(index: number) {
    this.questionCards.listOfQuestions.splice(index, 1);
    this.service.updateQuestionCards(this.questionCards);
  }
}
