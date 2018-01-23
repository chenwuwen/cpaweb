import {LoginmodelComponent} from './loginmodel/loginmodel.component';
import {LoginmodelModule} from './loginmodel/loginmodel.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DigitalTransferPipe} from './pipe/DigitalTransferPipe/digital-transfer.pipe';
import {ChangePostBodyPipe} from './pipe/ChangePostBodyPipe/change-post-body.pipe';
import {FileUploadModule} from 'ng2-file-upload';
import {ProgressComponent} from './progress/progress.component';
import {MypaginationModule} from './mypagination/mypagination.module';
import {ProgressModule} from './progress/progress.module';
import {SliceStringPipe} from './pipe/SubstrStringPipe/slice-string.pipe';

@NgModule({
  imports: [
    CommonModule,
    ProgressModule,
    MypaginationModule,
    // LoginmodelModule
  ],
  declarations: [DigitalTransferPipe, ChangePostBodyPipe, SliceStringPipe
  ],
  exports: [DigitalTransferPipe, ChangePostBodyPipe, SliceStringPipe, ProgressModule]
})
export class BaseModule {
}
