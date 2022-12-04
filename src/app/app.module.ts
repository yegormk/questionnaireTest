import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { QuestionManagementComponent } from './components/question-management/question-management.component';
import { QuestionCreateComponent } from './components/question-create/question-create.component';
import { QuestionEditComponent } from './components/question-edit/question-edit.component';
import { QuestionListsComponent } from './components/question-lists/question-lists.component';
import { AppRoutingModule } from './app-routing.module';

import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { getQuestionsReducer } from './store/questions.reducers';
import { questionsEffects } from './store/questions.effects';
import { IAppState } from './interfaces/app-state.interfaces';

export const materialModules = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatRadioModule,
  MatCardModule,
  MatCheckboxModule,
  MatListModule,
  MatIconModule,
];

const loginReducerMap: ActionReducerMap<IAppState> = {
  questions: getQuestionsReducer,
};

@NgModule({
  declarations: [
    AppComponent,
    QuestionManagementComponent,
    QuestionCreateComponent,
    QuestionEditComponent,
    QuestionListsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    materialModules,
    StoreModule.forRoot(loginReducerMap),
    EffectsModule.forRoot([questionsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
