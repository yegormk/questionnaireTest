import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as questionsActions from './questions.actions';
import { QuestionsService } from '../services/questions.service';
import { IAppState } from '../interfaces/app-state.interfaces';

@Injectable()
export class questionsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private questionsService: QuestionsService,
  ) {}

  public getQuestions$ = createEffect(() => this.actions$.pipe(
      ofType(questionsActions.getQuestionCards),
      mergeMap(action =>
        this.questionsService.getQuestionCards().pipe(
          map(response => questionsActions.getQuestionCardsSuccessful({ questions: response })),
          catchError(error => of(questionsActions.getQuestionCardsFailure({ error }))),
        ),
      ),
    ),
  );

  public addQuestions$ = createEffect(() => this.actions$.pipe(
      ofType(questionsActions.addQuestion),
      mergeMap(action =>
        this.questionsService.addQuestion(action.question).pipe(
          map(response => questionsActions.addQuestionCardsSuccessful({ questions: response })),
          catchError(error => of(questionsActions.addQuestionCardsFailure({ error }))),
        ),
      ),
    ),
  );

  public editQuestions$ = createEffect(() => this.actions$.pipe(
      ofType(questionsActions.editQuestion),
      mergeMap(action =>
        this.questionsService.editQuestion(action.question, action.index).pipe(
          map(response => questionsActions.editQuestionSuccessful({ editedListOfQuestions: response })),
          catchError(error => of(questionsActions.editQuestionFailure({ error }))),
        ),
      ),
    ),
  );

  public deleteQuestion$ = createEffect(() => this.actions$.pipe(
      ofType(questionsActions.deleteQuestion),
      mergeMap(action =>
        this.questionsService.deleteQuestion(action.index).pipe(
          map(response => questionsActions.deleteQuestionSuccessful({ editedListOfQuestions: response })),
          catchError(error => of(questionsActions.deleteQuestionFailure({ error }))),
        ),
      ),
    ),
  );

  public updateQuestion$ = createEffect(() => this.actions$.pipe(
      ofType(questionsActions.updateQuestionCards),
      mergeMap(action =>
        this.questionsService.answerQuestion(action.questions).pipe(
          map(response => questionsActions.updateQuestionCardsSuccessful()),
          catchError(error => of(questionsActions.updateQuestionCardsFailure({ error }))),
        ),
      ),
    ),
  );
}
