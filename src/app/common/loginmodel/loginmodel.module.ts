import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginmodelComponent } from './loginmodel.component';
import { TabsModule } from 'ngx-bootstrap';
@NgModule({
  imports: [
    TabsModule.forRoot(),
    CommonModule
  ],
  declarations: [LoginmodelComponent],
  exports: [LoginmodelComponent]
})
export class LoginmodelModule { }
