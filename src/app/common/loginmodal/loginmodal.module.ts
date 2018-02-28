import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginmodalComponent } from './loginmodal.component';
import { TabsModule, ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoginmodalService } from './loginmodal.service';
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
  declarations: [LoginmodalComponent],
  providers: [
    LoginmodalService
  ],
  exports: [LoginmodalComponent]
})
export class LoginmodalModule { }
