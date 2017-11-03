import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginmodelComponent } from './loginmodel.component';
import { TabsModule, ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoginmodelService } from './loginmodel.service';
import { CustomFormsModule } from 'ng2-validation';
@NgModule({
  imports: [
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    CommonModule,
    FormsModule,
    CustomFormsModule  //引入ng2-validation
  ],
  declarations: [LoginmodelComponent],
  providers: [
    LoginmodelService
  ],
  exports: [LoginmodelComponent]
})
export class LoginmodelModule { }
