import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IQuestionInfo } from '../../interfaces/question.interfaces';
import { localStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css'],
})
export class QuestionEditComponent implements OnInit {
  typeOfQuestion!: string;
  createQuestionForm!: FormGroup;
  questionOldData!: IQuestionInfo;

  constructor(private router: ActivatedRoute, private service: localStorageService) {}

  ngOnInit(): void {
    const indexOfQuestion = Number(this.router.snapshot.paramMap.get('index'));
    this.questionOldData = this.service.getQuestionCards().listOfQuestions[indexOfQuestion];
    this.typeOfQuestion = this.questionOldData.typeOfQuestion;
    this.createQuestionForm = new FormGroup({
      question: new FormControl(this.questionOldData.question, [Validators.required]),
      typeOfQuestion: new FormControl(this.questionOldData.typeOfQuestion, [Validators.required]),
      listOfCorrectOptions: new FormArray([]),
      listOfWrongOptions: new FormArray([]),
    });
    this.checkForArrays();
  }

  chooseTypeOfQuestion(event: any) {
    this.typeOfQuestion = event.target.value;
    if (event.target.value === 'Open') {
      while (this.listOfWrongOptions.length !== 0) {
        this.listOfWrongOptions.removeAt(0);
      }
    } else if (this.listOfWrongOptions.length === 0) {
      this.addWrongOption();
    }
    while (this.listOfCorrectOptions.length !== 1) {
      this.listOfCorrectOptions.removeAt(0);
    }
  }

  checkForArrays(): void {
    for (let i = 0; i < this.questionOldData.listOfOptions.length; i++) {
      this.questionOldData.listOfOptions[i].isRight
        ? this.addCorrectOption(this.questionOldData.listOfOptions[i].option)
        : this.addWrongOption(this.questionOldData.listOfOptions[i].option);
    }
  }

  addWrongOption(value: string = ''): void {
    this.listOfWrongOptions.push(
      new FormGroup({
        option: new FormControl(value, Validators.required),
        isRight: new FormControl(false, Validators.required),
      }),
    );
  }

  addCorrectOption(value: string = ''): void {
    this.listOfCorrectOptions.push(
      new FormGroup({
        option: new FormControl(value, Validators.required),
        isRight: new FormControl(true, Validators.required),
      }),
    );
  }

  removeWrongOption(idx: number): void {
    this.listOfWrongOptions.removeAt(idx);
  }

  removeCorrectOption(idx: number): void {
    this.listOfCorrectOptions.removeAt(idx);
  }

  get listOfWrongOptions() {
    return this.createQuestionForm.get('listOfWrongOptions') as FormArray;
  }

  get listOfCorrectOptions() {
    return this.createQuestionForm.get('listOfCorrectOptions') as FormArray;
  }

  previousPage() {
    this.service.moveTo('');
  }

  onSubmit(): void {
    if (this.createQuestionForm.invalid) {
      return;
    }

    this.service.setQuestionCard(
      {
        question: this.createQuestionForm.value.question,
        typeOfQuestion: this.createQuestionForm.value.typeOfQuestion,
        listOfOptions: this.listOfWrongOptions.value.concat(this.listOfCorrectOptions.value),
        isAnswered: false,
        dateOfCreation: new Date(),
      },
      Number(this.router.snapshot.paramMap.get('index'))
    );
  }
}
