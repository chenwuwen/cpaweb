import {LoginModalModule} from './loginmodal/loginmodal.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DigitalTransferPipe} from './pipe/DigitalTransferPipe/digital-transfer.pipe';
import {ChangePostBodyPipe} from './pipe/ChangePostBodyPipe/change-post-body.pipe';
import {MypaginationModule} from './mypagination/mypagination.module';
import {SliceStringPipe} from './pipe/SubstrStringPipe/slice-string.pipe';
import {ShareModule} from './share/share.module';
import {SearchmodalModule} from './searchmodal/searchmodal.module';
import {ScrollPageDirective} from './scroll/scroll-page.directive';
import {ChatModule} from './chat/chat.module';


/**
 * 将一些公共模块导入基础模块，并导出相应组件,其他模块需要使用公共组件时,直接引入本模块即可
 * 需要注意的时，如果其他模块引入了该基础模块的同时，又引入该基础模块内的模块，会造成报错：具体异常是：
 * ERROR in Maximum call stack size exceeded
 */

/**
 * https://www.cnblogs.com/shitoupi/p/6641230.html
 */

/**
 * 其中最重要的属性是：
 * declarations：声明本模块中拥有的视图类。Angular有三种视图类：组件、指令和管道。
 * exports：declarations的子集，可用于其它模块的组件模板。
 * imports：本模块声明的组件模板需要的类所在的其它模块。
 * providers：服务的创建者，并加入到全局服务列表中，可用于应用任何部分。
 * bootstrap：指定应用的主视图（称为根组件），它是所有其它视图的宿主。只有根模块才能设置bootstrap属性。
 */

/**
 * 数组类型的选项,我们的模块需要依赖的一些其他的模块,这样做的目的使我们这个模块，可以直接使用别的模块提供的一些指令,组件等等
 */
@NgModule({
  imports: [
    CommonModule,
    ChatModule,
    // LoginModalModule,
    ShareModule,
    SearchmodalModule
  ],
  /**
   * 数组类型的选项, 用来声明属于这个模块的指令,管道等等，然后我们就可以在这个模块中使用它们了.
   */
  declarations: [DigitalTransferPipe, ChangePostBodyPipe, SliceStringPipe, ScrollPageDirective
  ],
  /**
   * 这个选项是一个数组,需要我们列出我们这个模块的一些需要共用的服务，然后我们就可以在这个模块的各个组件中通过依赖注入使用了.
   */
  providers: [],

  /**
   * 数组类型的选项,指定一系列的组件,这些组件将会在这个模块定义的时候进行编译,Angular会为每一个组件创建一个ComponentFactory然后把它存储在ComponentFactoryResolver
   */
  entryComponents: [],

  /**
   * 数组类型选项, 指定了这个模块启动的时候应该启动的组件.当然这些组件会被自动的加入到entryComponents中去
   */
  bootstrap: [],

  /**
   * 不属于Angular的组件或者指令的元素或者属性都需要在这里进行声明.
   */
  schemas: [],

  /**
   * 字符串类型的选项,模块的隐藏ID,它可以是一个名字或者一个路径;用来在getModuleFactory区别模块,如果这个属性是undefined，那么这个模块将不会被注册.
   */
  id: 'common',

  /**
   * 关于导出export
   * export的作用是，如果其他模块引入了本模块，那么就可以使用本模块导出的功能，就如本模块一样为baseModule 基础模块
   * 当其他模块import该模块后，就可以使用本模块export中的功能了，但是export中的组件，需要现在import中引入,或者declarations中声明
   * 依赖，才能exports
   */


  /**
   * 数组类型的选项,我们这个模块需要导出的一些组件,指令,模块等;如果别的模块导入了我们这个模块,
   * 那么别的模块就可以直接使用我们在这里导出的组件,指令模块等.
   */
  exports: [DigitalTransferPipe, ChangePostBodyPipe, SliceStringPipe, ShareModule, MypaginationModule,
    SearchmodalModule, ScrollPageDirective, LoginModalComponent, ShareComponent
  ]
})
export class BaseModule {
}
