import {BaseModule} from './../common/base.module';
import {LoginmodalModule} from '../common/loginmodal/loginmodal.module';
import {NgModule} from '@angular/core';
import {UnitexamComponent} from './unitexam.component';
import {UnitexamService} from './unitexam.service';
import {UtilModule} from '../util/util.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomFormsModule} from 'ng2-validation';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    UtilModule,
    RouterModule,
    BrowserAnimationsModule, /*动画所需Module*/
    LoginmodalModule,
    CustomFormsModule,  //引入ng2-validation
    BaseModule
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
