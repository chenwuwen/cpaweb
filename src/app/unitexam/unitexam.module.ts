import { NgModule } from '@angular/core';
import { UnitexamComponent } from './unitexam.component';
import {UnitexamService} from "./unitexam.service";

@NgModule({
  imports: [
    UnitexamComponent
  ],
  declarations: [
    UnitexamService
  ]
})
export class UnitexamModule { }
