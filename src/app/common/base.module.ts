import {LoginmodelModule} from './loginmodel/loginmodel.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DigitalTransferPipe} from './pipe/DigitalTransferPipe/digital-transfer.pipe';
import {ChangePostBodyPipe} from './pipe/ChangePostBodyPipe/change-post-body.pipe';
import {MypaginationModule} from './mypagination/mypagination.module';
import {ProgressModule} from './progress/progress.module';
import {SliceStringPipe} from './pipe/SubstrStringPipe/slice-string.pipe';
import {ShareModule} from './share/share.module';


/**
 * 将一些公共模块导入基础模块，并导出相应组件,其他模块需要使用公共组件时,直接引入本模块即可
 * 需要注意的时，如果其他模块引入了该基础模块的同时，又引入该基础模块内的模块，会造成报错：具体异常是：
 * ERROR in Maximum call stack size exceeded
 */
@NgModule({
  imports: [
    CommonModule,
    ProgressModule,
    MypaginationModule,
    // LoginmodelModule,
    ShareModule
  ],
  declarations: [DigitalTransferPipe, ChangePostBodyPipe, SliceStringPipe
  ],
  exports: [DigitalTransferPipe, ChangePostBodyPipe, SliceStringPipe,  ShareModule,  MypaginationModule, ProgressModule]
})
export class BaseModule {
}
