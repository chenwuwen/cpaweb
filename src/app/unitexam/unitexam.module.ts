import {NgModule} from '@angular/core';
import {UnitexamComponent} from './unitexam.component';
import {UnitexamService} from "./unitexam.service";
import {UtilModule} from "../util/util.module";
import {CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import {RouterModule} from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    UtilModule,
    RouterModule
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
