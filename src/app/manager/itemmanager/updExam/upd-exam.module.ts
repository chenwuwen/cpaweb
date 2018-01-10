import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UpdExamComponent} from './upd-exam.component';
import {UpdExamService} from './upd-exam.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UpdExamComponent],
  providers: [UpdExamService]
})
export class UpdExamModule {
}
