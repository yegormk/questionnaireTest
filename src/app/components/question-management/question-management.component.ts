import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as questionsActions from '../../store/questions.actions';
import { selectAllQuestions } from '../../store/questions.selectors';

import { IAppState } from '../../interfaces/app-state.interfaces';
import { routerManagement } from '../../services/router-management.service';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.css'],
})
export class QuestionManagementComponent implements OnInit {
  questionCards$ = this.store.select(selectAllQuestions);

  constructor(private router: routerManagement, private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store.dispatch(questionsActions.getQuestionCards());
  }

  createQuestion(): void {
    this.router.moveTo('/create');
  }

  answerQuestions(): void {
    this.router.moveTo('/lists');
  }

  editCard(index: number): void {
    this.router.moveTo(`/edit/${index}`);
  }

  deleteCard(index: number): void {
    this.store.dispatch(questionsActions.deleteQuestion({ index: index }));
  }
}
