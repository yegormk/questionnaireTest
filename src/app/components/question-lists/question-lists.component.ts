import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';

import { IQuestionInfo } from '../../interfaces/question.interfaces';
import { localStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'app-question-lists',
  templateUrl: './question-lists.component.html',
  styleUrls: ['./question-lists.component.css'],
})
export class QuestionListsComponent implements OnInit, OnDestroy {
  questionCards!: IQuestionInfo[];

  constructor(private service: localStorageService) {}

  ngOnInit(): void {
    if (this.service.isDataExists()) {
      this.questionCards = this.service.getQuestionCards().listOfQuestions;
    }
  }

  managementPage(): void {
    this.service.moveTo('');
  }

  answer(indexOfQuestion: number, answerValue: MatListOption[] | string) {
    if (typeof answerValue === 'object') {
      for (let i = 0; i < answerValue.length; i++) {
        this.questionCards[indexOfQuestion].listOfOptions.map(el => {
          if (el === answerValue[i].value) el.isChosen = true;
        });
      }
    } else {
      this.questionCards[indexOfQuestion].listOfOptions[0].option === answerValue
        ? (this.questionCards[indexOfQuestion].listOfOptions[0].isChosen = true)
        : this.questionCards[indexOfQuestion].listOfOptions.push({
            option: answerValue,
            isRight: false,
            isChosen: true,
          });
    }
    this.questionCards[indexOfQuestion].isAnswered = true;
  }

  rollBack(index: number) {
    if (this.questionCards[index].typeOfQuestion === 'Open') {
      this.questionCards[index].listOfOptions.splice(1, 1);
    }
    this.questionCards[index].isAnswered = false;
    this.questionCards[index].listOfOptions.map(x => (x.isChosen = false));
  }

  ngOnDestroy() {
    this.service.updateQuestionCards({ listOfQuestions: this.questionCards });
  }
}
