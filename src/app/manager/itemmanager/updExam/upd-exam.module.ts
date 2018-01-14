import { BaseModule } from './../../../common/base.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UpdExamComponent} from './upd-exam.component';
import {UpdExamService} from './upd-exam.service';
import {FormsModule} from '@angular/forms';
import { PaginationModule, TooltipModule  } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, /*template中如果使用了[(ngModule)]需要导入此模块,模型驱动表单*/
    BaseModule,
    TooltipModule.forRoot(), /**ngx-bootstrap tooltip组件*/
    PaginationModule.forRoot() /**ngx-bootstrap 分页组件*/
  ],
  declarations: [UpdExamComponent],
  providers: [UpdExamService]
})
export class UpdExamModule {
}
