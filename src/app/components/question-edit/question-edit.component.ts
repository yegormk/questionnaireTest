import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { selectAllQuestions } from '../../store/questions.selectors';
import * as questionsActions from '../../store/questions.actions';

import { IOption } from '../../interfaces/question.interfaces';
import { IAppState } from '../../interfaces/app-state.interfaces';
import { routerManagement } from '../../services/router-management.service';

enum TypeOfQuestion {
  Open = 'Open',
  Single = 'Single',
  Multiple = 'Multiple',
}

enum TypeOfOption {
  correct = 'correct',
  wrong = 'wrong',
}

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css'],
})
export class QuestionEditComponent implements OnInit {
  createQuestionForm!: FormGroup;
  questionData$ = this.store.select(selectAllQuestions);

  constructor(
    private router: ActivatedRoute,
    private routerManagement: routerManagement,
    private store: Store<IAppState>,
  ) {}

  ngOnInit(): void {
    const indexOfQuestion = Number(this.router.snapshot.paramMap.get('index'));
    this.store.dispatch(questionsActions.getQuestionCards());
    this.questionData$
      .subscribe(value => {
        this.createQuestionForm = new FormGroup({
          question: new FormControl(value.listOfQuestions[indexOfQuestion].question, [Validators.required]),
          typeOfQuestion: new FormControl(value.listOfQuestions[indexOfQuestion].typeOfQuestion, [Validators.required]),
          options: new FormArray([]),
        });
        value.listOfQuestions[indexOfQuestion].listOfOptions.map(x =>
          x.isRight
            ? this.addOption(TypeOfOption['correct'], x.option)
            : this.addOption(TypeOfOption['wrong'], x.option),
        );
      })
      .unsubscribe();
  }

  changeTypeOfQuestion(event: any): void {
    this.removeListOfOptions();
    this.addOption(TypeOfOption['correct']);
    if (event.target.value !== TypeOfQuestion['Open']) this.addOption(TypeOfOption['wrong']);
  }

  addOption(type: string, value: string = ''): void {
    this.listOfOptions.push(
      new FormGroup({
        option: new FormControl(value, Validators.required),
        isRight: new FormControl(type !== TypeOfOption['wrong'], Validators.required),
        isChosen: new FormControl(false, Validators.required),
      }),
    );
  }

  removeOption(idx: number): void {
    this.listOfOptions.removeAt(idx);
  }

  removeListOfOptions(): void {
    while (this.listOfOptions.length !== 0) {
      this.listOfOptions.removeAt(0);
    }
  }

  get listOfOptions(): FormArray {
    return this.createQuestionForm.get('options') as FormArray;
  }

  get amountOfCorrectOptions(): number {
    return this.listOfOptions.value.filter((x: IOption) => x.isRight).length;
  }

  get amountOfWrongOptions(): number {
    return this.listOfOptions.value.filter((x: IOption) => !x.isRight).length;
  }

  get isSingle(): boolean {
    return this.createQuestionForm.controls['typeOfQuestion'].value === TypeOfQuestion['Single'];
  }

  get isMultiple(): boolean {
    return this.createQuestionForm.controls['typeOfQuestion'].value === TypeOfQuestion['Multiple'];
  }

  get isOpen(): boolean {
    return this.createQuestionForm.controls['typeOfQuestion'].value === TypeOfQuestion['Open'];
  }

  previousPage(): void {
    this.routerManagement.moveTo('');
  }

  onSubmit(): void {
    if (this.createQuestionForm.invalid) {
      return;
    }

    this.store.dispatch(
      questionsActions.editQuestion({
        question: {
          question: this.createQuestionForm.value.question,
          typeOfQuestion: this.createQuestionForm.value.typeOfQuestion,
          listOfOptions: this.listOfOptions.value,
          isAnswered: false,
          dateOfCreation: new Date(),
        },
        index: Number(this.router.snapshot.paramMap.get('index')),
      })
    );
  }
}
