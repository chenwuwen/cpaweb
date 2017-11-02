import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginmodelComponent } from './loginmodel.component';
import { TabsModule, ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoginmodelService } from './loginmodel.service';
@NgModule({
  imports: [
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    CommonModule,
    FormsModule
  ],
  declarations: [LoginmodelComponent],
  providers: [
    LoginmodelService
  ],
  exports: [LoginmodelComponent]
})
export class LoginmodelModule { }
