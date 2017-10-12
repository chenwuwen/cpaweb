import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemmanagerComponent} from './itemmanager.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ItemmanagerService} from "./itemmanager.service";
import {BaseModule} from "../../common/base.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule, /*template中如果使用了[(ngModule)]需要导入此模块,模型驱动表单*/
    ReactiveFormsModule, /*响应式表单ReactiveFormsModule,优点测试容易,数组的话用响应式表单比较好*/
    BaseModule
  ],
  declarations: [ItemmanagerComponent],
  providers: [
    ItemmanagerService
  ]
})
export class ItemmanagerModule {
}
