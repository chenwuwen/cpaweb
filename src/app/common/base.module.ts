import {LoginmodelModule} from './loginmodel/loginmodel.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DigitalTransferPipe} from './pipe/DigitalTransferPipe/digital-transfer.pipe';
import {ChangePostBodyPipe} from './pipe/ChangePostBodyPipe/change-post-body.pipe';
import {MypaginationModule} from './mypagination/mypagination.module';
import {ProgressModule} from './progress/progress.module';
import {SliceStringPipe} from './pipe/SubstrStringPipe/slice-string.pipe';
import {ShareModule} from './share/share.module';

@NgModule({
  imports: [
    CommonModule,
    ProgressModule,
    MypaginationModule,
    LoginmodelModule,
    ShareModule
  ],
  declarations: [DigitalTransferPipe, ChangePostBodyPipe, SliceStringPipe
  ],
  exports: [DigitalTransferPipe, ChangePostBodyPipe, SliceStringPipe, ProgressModule, LoginmodelModule, ShareModule]
})
export class BaseModule {
}
