import {NgModule} from '@angular/core';
import {UnitexamComponent} from './unitexam.component';
import {UnitexamService} from "./unitexam.service";
import {UtilModule} from "../util/util.module";

@NgModule({
  imports: [
    UtilModule
  ],
  declarations: [
    UnitexamComponent,
  ],
  providers: [
    UnitexamService
  ]
})
export class UnitexamModule {
}
