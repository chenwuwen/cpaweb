import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemmanagerComponent} from './itemmanager.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule, /*template中如果使用了[(ngModule)]需要导入此模块*/
  ],
  declarations: [ItemmanagerComponent]
})
export class ItemmanagerModule {
}
