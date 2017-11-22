import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { DigitalTransferPipe } from "./pipe/DigitalTransferPipe/digital-transfer.pipe";
import { ChangePostBodyPipe } from './pipe/ChangePostBodyPipe/change-post-body.pipe';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DigitalTransferPipe, ChangePostBodyPipe],
  exports: [DigitalTransferPipe, ChangePostBodyPipe]
})
export class BaseModule {
}
