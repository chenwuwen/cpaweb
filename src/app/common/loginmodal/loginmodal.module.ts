import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginModalComponent} from './loginmodal.component';
import { TabsModule, ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoginModalService } from './loginmodal.service';
import { CustomFormsModule } from 'ng2-validation';
import { BaseModule } from '../base.module';
@NgModule({
  imports: [
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    CommonModule,
    FormsModule,
    BaseModule,
    CustomFormsModule  //引入ng2-validation
  ],
  declarations: [LoginModalComponent],
  providers: [
    LoginModalService
  ],
  exports: [LoginModalComponent]
})
export class LoginModalModule { }
