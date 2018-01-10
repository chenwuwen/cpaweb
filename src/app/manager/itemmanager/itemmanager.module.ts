import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UpdExamModule} from './updExam/upd-exam.module';
import {AddExamModule} from './addExam/add-exammodule';

@NgModule({
  imports: [
    CommonModule,
    AddExamModule,
    UpdExamModule
  ],
  declarations: []
})
export class ItemmanagerModule { }
