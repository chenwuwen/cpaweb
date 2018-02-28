import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchmodalComponent} from './searchmodal.component';
import {ModalModule} from 'ngx-bootstrap';
import {SearchmodalService} from './searchmodal.service';

@NgModule({
  imports: [
    ModalModule.forRoot(),
    CommonModule
  ],
  declarations: [SearchmodalComponent],
  providers: [
    SearchmodalService
  ],
  exports: [SearchmodalComponent]
})
export class SearchmodalModule {
}
