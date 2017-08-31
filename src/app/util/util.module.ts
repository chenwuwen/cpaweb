import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UtilComponent} from "./util.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UtilComponent],
  /*导出组件(导出组件后，其他组件只需引入该组件模块,即可使用该组件)*/
  exports: [UtilComponent]
})
export class UtilModule { }
