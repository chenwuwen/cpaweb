import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShareComponent} from './share.component';
import {ModalModule} from 'ngx-bootstrap';
import {ShareService} from './share.service';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  declarations: [ShareComponent],
  providers: [ShareService],
  exports: [ShareComponent]
})
export class ShareModule {
}
