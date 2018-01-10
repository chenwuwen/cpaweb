import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { AddExamComponent } from './add-exam.component';
import { AddExamService } from './add-exam.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AddExamComponent],
  providers: [AddExamService]
})
export class AddExamModule {
}
