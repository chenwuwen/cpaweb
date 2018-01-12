import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UpdExamComponent} from './upd-exam.component';
import {UpdExamService} from './upd-exam.service';
import {FormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, /*template中如果使用了[(ngModule)]需要导入此模块,模型驱动表单*/
    PaginationModule.forRoot()
  ],
  declarations: [UpdExamComponent],
  providers: [UpdExamService]
})
export class UpdExamModule {
}
