import {BaseModule} from './../common/base.module';
import {LoginModalModule} from '../common/loginmodal/loginmodal.module';
import {NgModule} from '@angular/core';
import {UnitExamService} from './unitexam.service';
import {UtilModule} from '../util/util.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomFormsModule} from 'ng2-validation';
import {GrowlModule} from 'primeng/growl';
import { ElModule } from 'element-angular/release/element-angular.module';
import {UnitExamComponent} from './unitexam.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    UtilModule,
    RouterModule,
    GrowlModule, /*primeng消息提示模块*/
    BrowserAnimationsModule, /*动画所需Module*/
    LoginModalModule,
    CustomFormsModule,  // 引入ng2-validation
    ElModule.forRoot(),
    BaseModule
  ],
  declarations: [
    UnitExamComponent
  ],
  providers: [
    UnitExamService
  ]
})
export class UnitExamModule {
}
