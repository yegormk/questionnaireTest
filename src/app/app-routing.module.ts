import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionCreateComponent } from './components/question-create/question-create.component';
import { QuestionEditComponent } from './components/question-edit/question-edit.component';
import { QuestionListsComponent } from './components/question-lists/question-lists.component';
import { QuestionManagementComponent } from './components/question-management/question-management.component';

export const routes: Routes = [
  {
    path: '',
    component: QuestionManagementComponent,
  },
  {
    path: 'create',
    component: QuestionCreateComponent,
  },
  {
    path: 'edit/:index',
    component: QuestionEditComponent,
  },
  {
    path: 'lists',
    component: QuestionListsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
