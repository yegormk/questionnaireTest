import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { IOption } from '../../interfaces/question.interfaces';
import * as questionsActions from '../../store/questions.actions';
import { Store } from '@ngrx/store';
import { IAppState } from '../../interfaces/app-state.interfaces';
import { routerManagement } from '../../services/router-management.service';

enum TypeOfQuestion {
  Open = 'Open',
  Single = 'Single',
  Multiple = 'Multiple',
}

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css'],
})
export class QuestionCreateComponent implements OnInit {
  createQuestionForm!: FormGroup;

  constructor(private router: routerManagement, private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.createQuestionForm = new FormGroup({
      question: new FormControl('', [Validators.required]),
      typeOfQuestion: new FormControl('', [Validators.required]),
      listOfOptions: new FormArray([]),
    });
  }

  chooseTypeOfQuestion(event: any): void {
    while (this.listOfOptions.length !== 0) {
      this.listOfOptions.removeAt(0);
    }
    this.addOption('correct');
    if (event.target.value !== TypeOfQuestion['Open']) {
      this.addOption('wrong');
    }
  }

  addOption(type: string): void {
    this.listOfOptions.push(
      new FormGroup({
        option: new FormControl('', Validators.required),
        isRight: new FormControl(type !== 'wrong', Validators.required),
        isChosen: new FormControl(false, Validators.required),
      }),
    );
  }

  removeOption(idx: number): void {
    this.listOfOptions.removeAt(idx);
  }

  get listOfOptions() {
    return this.createQuestionForm.get('listOfOptions') as FormArray;
  }

  get amountOfCorrectOptions() {
    return this.listOfOptions.value.filter((x: IOption) => x.isRight).length;
  }

  get amountOfWrongOptions() {
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

  previousPage() {
    this.router.moveTo('');
  }

  onSubmit(): void {
    if (this.createQuestionForm.invalid) {
      return;
    }

    this.store.dispatch(
      questionsActions.addQuestion({
        question: {
          question: this.createQuestionForm.value.question,
          typeOfQuestion: this.createQuestionForm.value.typeOfQuestion,
          listOfOptions: this.listOfOptions.value,
          isAnswered: false,
          dateOfCreation: new Date(),
        },
      })
    );
  }
}
