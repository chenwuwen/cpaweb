/*每个在浏览器中运行的应用的根模块都需要引入BrowserModule*/
import {BrowserModule} from '@angular/platform-browser';
/*每个模块都需要引入的核心库中的NgModule*/
import {NgModule} from '@angular/core';
/*表单模块，在应用中使用表单时引入*/
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/*http模块，当需要进行http远程请求时引入*/
import {HttpModule} from '@angular/http';
/*路由模块*/
import {RouterModule} from '@angular/router';
/*该模块是包含一些常用内置指令模块，如*ngFor*/
import {CommonModule} from '@angular/common';
/*ngRx状态管理模块*/
import {StoreModule} from '@ngrx/store';
/*ngx-bootstrap下拉菜单模块模块*/
import {BsDropdownModule} from 'ngx-bootstrap';
import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {UnitexamModule} from './unitexam/unitexam.module';
import {HomeModule} from './home/home.module';
import {ManagerModule} from './manager/manager.module';
import {ItemmanagerModule} from './manager/itemmanager/itemmanager.module';
import {UsercenterModule} from './usercenter/usercenter.module';
import {AppService} from './app.service';
import {loginStateReducer} from './common/reducer/loginStateReducer';
import {BaseModule} from './common/base.module';
import {LoginmodalModule} from './common/loginmodal/loginmodal.module';
import {ShareModule} from './common/share/share.module';

@NgModule({
  declarations: [/*声明属于本模块的组件，每个组件(管道)必须在且仅在一个模块中声明,g*/
    AppComponent
  ],
  imports: [/*引入买本模块中用到的模块，该模块是处于import语句引入的模块中*/
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule, /*加入响应式表单ReactiveFormsModule*/
    BsDropdownModule.forRoot(), /*导入ngx-bootstrap下拉菜单模块*/
    /*angular2默认采用HTML5的pushState来管理路由，它会导致前端路由与后端路由的冲突，例如当部署到nginx环境时，
     我们通过首页进入子路由一切正常，但是在子路由路径下，刷新就会报404了。默认情况下nginx会当成这个路径是实际web路径下的资源而去定位它，
     但可想而知实际是并不存在的。折中的方案可以改回hash风格*/
    RouterModule.forRoot(appRoutes, {useHash: false}), /*angular2项目中url去掉#(即哈希路由)*/
    UnitexamModule,
    UsercenterModule,
    HomeModule,
    ManagerModule,
    ItemmanagerModule,
    BaseModule,
    LoginmodalModule,
    /*使用ngRx进行状态管理,StoreModule提供了一个provideStore方法,
     *在这个方法中我们声明了一个 { loginState: loginStateReducer, }
     * 对象，这个就是Store。前面讲过Store可以想象成数据库，Reducer可以想象成表，
     *那么这样一个对象形式告诉我们数据库是由那些表构成的
     * 那么可以看到我们定义了Reducer：loginStateReducer。在看代码之前，我们来思考一下这个流程，
     * 所谓Reducer其实就是接收两个参数：之前的状态和要采取的动作，然后返回新的状态。
     * StoreModule.provideStore() 在 Angular4的 @ngrx/store 版本中已经更新为更为标准化的StoreModule.forRoot()
     */
    StoreModule.provideStore({
      loginState: loginStateReducer,
    })
  ],
  providers: [/*声明模块中使用的服务的提供者,对于appModule来说,也应该就是控制导航菜单显示了，即权限控制*/
    AppService
  ],
  bootstrap: [/*根模块中的引导组件，应用启动过程中，会创建这个数组中的组件并插入到HTML中，一般只有一个引导组件*/
    AppComponent
  ]
})
// 使用export语句，创建模块的类并暴露出去。模块、组件只有暴露出去，其他的模块才能引用
export class AppModule {
}
