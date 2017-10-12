import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DigitalTransferPipe} from "./pipe/digital-transfer.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DigitalTransferPipe],
  exports: [DigitalTransferPipe]
})
export class BaseModule {
}
