import {BaseModule} from './../../../common/base.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UpdExamComponent} from './upd-exam.component';
import {UpdExamService} from './upd-exam.service';
import {FormsModule} from '@angular/forms';
import {PaginationModule, ModalModule, PopoverModule, BsDropdownModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, /*template中如果使用了[(ngModule)]需要导入此模块,模型驱动表单*/
    BaseModule,
    PopoverModule.forRoot(), /**ngx-bootstrap popover组件*/
    ModalModule.forRoot(), /**ngx-bootstrap Modal组件*/
    PaginationModule.forRoot(), /**ngx-bootstrap 分页组件*/
    BsDropdownModule.forRoot() /**ngx-bootstrap 下拉按钮组组件*/
  ],
  declarations: [UpdExamComponent],
  providers: [UpdExamService]
})
export class UpdExamModule {
}
