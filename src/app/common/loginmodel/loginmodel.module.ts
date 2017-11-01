import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginmodelComponent } from './loginmodel.component';
import { TabsModule, ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    CommonModule,
    FormsModule
  ],
  declarations: [LoginmodelComponent],
  exports: [LoginmodelComponent]
})
export class LoginmodelModule { }
