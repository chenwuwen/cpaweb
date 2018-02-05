import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShareComponent} from './share.component';
import {ModalModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  declarations: [ShareComponent],
  exports: [ShareComponent]
})
export class ShareModule {
}
