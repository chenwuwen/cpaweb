import {LoginmodalModule} from './loginmodal/loginmodal.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DigitalTransferPipe} from './pipe/DigitalTransferPipe/digital-transfer.pipe';
import {ChangePostBodyPipe} from './pipe/ChangePostBodyPipe/change-post-body.pipe';
import {MypaginationModule} from './mypagination/mypagination.module';
import {SliceStringPipe} from './pipe/SubstrStringPipe/slice-string.pipe';
import {ShareModule} from './share/share.module';
import {SearchmodalModule} from './searchmodal/searchmodal.module';
import {ScrollPageDirective} from './scroll/scroll-page.directive';


/**
 * 将一些公共模块导入基础模块，并导出相应组件,其他模块需要使用公共组件时,直接引入本模块即可
 * 需要注意的时，如果其他模块引入了该基础模块的同时，又引入该基础模块内的模块，会造成报错：具体异常是：
 * ERROR in Maximum call stack size exceeded
 */
@NgModule({
  imports: [
    CommonModule,
    MypaginationModule,
    // LoginmodalModule,
    ShareModule,
    SearchmodalModule
  ],
  declarations: [DigitalTransferPipe, ChangePostBodyPipe, SliceStringPipe, ScrollPageDirective
  ],
  /**
   * 关于导出export
   * export的作用是，如果其他模块引入了本模块，那么就可以使用本模块导出的功能，就如本模块一样为baseModule 基础模块
   * 当其他模块import该模块后，就可以使用本模块export中的功能了，但是export中的组件，需要现在import中引入,或者declarations中声明
   * 依赖，才能exports
   */
  exports: [DigitalTransferPipe, ChangePostBodyPipe, SliceStringPipe, ShareModule, MypaginationModule, SearchmodalModule, ScrollPageDirective]
})
export class BaseModule {
}
