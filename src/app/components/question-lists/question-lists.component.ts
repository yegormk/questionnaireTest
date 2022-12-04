import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';

import { Store } from '@ngrx/store';
import { selectAllQuestions } from '../../store/questions.selectors';
import * as questionsActions from '../../store/questions.actions';

import { IAppState } from '../../interfaces/app-state.interfaces';
import { IQuestionInfo } from '../../interfaces/question.interfaces';
import { routerManagement } from '../../services/router-management.service';

@Component({
  selector: 'app-question-lists',
  templateUrl: './question-lists.component.html',
  styleUrls: ['./question-lists.component.css'],
})
export class QuestionListsComponent implements OnInit {
  questionCards$ = this.store.select(selectAllQuestions);

  constructor(private router: routerManagement, private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store.dispatch(questionsActions.getQuestionCards());
  }

  managementPage(): void {
    this.router.moveTo('');
  }

  answer(indexOfQuestion: number, answerValue: MatListOption[] | string, oldListOfQuestions: IQuestionInfo[]) {
    const updatedListOfQuestions: IQuestionInfo[] = JSON.parse(JSON.stringify(oldListOfQuestions));

    if (typeof answerValue === 'object') {
      for (let i = 0; i < answerValue.length; i++) {
        updatedListOfQuestions[indexOfQuestion].listOfOptions.map(el => {
          if (el.option === answerValue[i].value.option) el.isChosen = true;
        });
      }
    } else {
      updatedListOfQuestions[indexOfQuestion].listOfOptions[0].option === answerValue
        ? (updatedListOfQuestions[indexOfQuestion].listOfOptions[0].isChosen = true)
        : updatedListOfQuestions[indexOfQuestion].listOfOptions.push({
            option: answerValue,
            isRight: false,
            isChosen: true,
          });
    }
    updatedListOfQuestions[indexOfQuestion].isAnswered = true;
    this.store.dispatch(questionsActions.updateQuestionCards({ questions: updatedListOfQuestions }));
  }

  rollBack(index: number, oldListOfQuestions: IQuestionInfo[]) {
    const updatedListOfQuestions: IQuestionInfo[] = JSON.parse(JSON.stringify(oldListOfQuestions));

    if (updatedListOfQuestions[index].typeOfQuestion === 'Open')
      updatedListOfQuestions[index].listOfOptions.splice(1, 1);
    updatedListOfQuestions[index].isAnswered = false;
    updatedListOfQuestions[index].listOfOptions.map(x => (x.isChosen = false));
    this.store.dispatch(questionsActions.updateQuestionCards({ questions: updatedListOfQuestions }));
  }
}
