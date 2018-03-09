import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddExamComponent} from './add-exam.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddExamService} from './add-exam.service';
import {BaseModule} from '../../../common/base.module';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, /*template中如果使用了[(ngModule)]需要导入此模块,模型驱动表单*/
    ReactiveFormsModule, /*响应式表单ReactiveFormsModule,优点测试容易,数组的话用响应式表单比较好*/
    MatRadioModule, /*material ui库组件 radio组件*/
    BaseModule
  ],
  declarations: [AddExamComponent],
  providers: [
    AddExamService
  ]
})
export class AddExamModule {
}
