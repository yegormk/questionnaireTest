import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { localStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css'],
})
export class QuestionCreateComponent implements OnInit {
  typeOfQuestion!: string;
  createQuestionForm!: FormGroup;

  constructor(private service: localStorageService) {}

  ngOnInit(): void {
    this.createQuestionForm = new FormGroup({
      question: new FormControl('', [Validators.required]),
      typeOfQuestion: new FormControl('', [Validators.required]),
      listOfCorrectOptions: new FormArray([
        new FormGroup({
          option: new FormControl('', Validators.required),
          isRight: new FormControl(true, Validators.required),
          isChosen: new FormControl(false, Validators.required),
        }),
      ]),
      listOfWrongOptions: new FormArray([
        new FormGroup({
          option: new FormControl('', Validators.required),
          isRight: new FormControl(false, Validators.required),
          isChosen: new FormControl(false, Validators.required),
        }),
      ]),
    });
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

  addWrongOption(): void {
    this.listOfWrongOptions.push(
      new FormGroup({
        option: new FormControl('', Validators.required),
        isRight: new FormControl(false, Validators.required),
        isChosen: new FormControl(false, Validators.required),
      }),
    );
  }

  addCorrectOption(): void {
    this.listOfCorrectOptions.push(
      new FormGroup({
        option: new FormControl('', Validators.required),
        isRight: new FormControl(true, Validators.required),
        isChosen: new FormControl(false, Validators.required),
      }),
    );
  }

  removeWrongOption(idx: number): void {
    this.listOfWrongOptions.removeAt(idx);
  }

  get listOfWrongOptions() {
    return this.createQuestionForm.get('listOfWrongOptions') as FormArray;
  }

  get listOfCorrectOptions() {
    return this.createQuestionForm.get('listOfCorrectOptions') as FormArray;
  }

  removeCorrectOption(idx: number): void {
    this.listOfCorrectOptions.removeAt(idx);
  }

  previousPage() {
    this.service.moveTo('');
  }

  onSubmit(): void {
    if (this.createQuestionForm.invalid) {
      return;
    }

    this.service.setQuestionCard({
      question: this.createQuestionForm.value.question,
      typeOfQuestion: this.createQuestionForm.value.typeOfQuestion,
      listOfOptions: this.listOfWrongOptions.value.concat(this.listOfCorrectOptions.value),
      isAnswered: false,
      dateOfCreation: new Date(),
    });
  }
}
