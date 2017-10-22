import {BrowserModule} from '@angular/platform-browser';
/*每个在浏览器中运行的应用的根模块都需要引入BrowserModule*/
import {NgModule} from '@angular/core';
/*每个模块都需要引入的核心库中的NgModule*/
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/*表单模块，在应用中使用表单时引入*/
import {HttpModule} from '@angular/http';
/*http模块，当需要进行http远程请求时引入*/
import {Ng2BootstrapModule} from 'ngx-bootstrap';
import {RouterModule} from '@angular/router';
/*路由模块*/
import {CommonModule} from '@angular/common';
/*该模块是包含一些常用内置指令模块，如*ngFor*/


import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {UnitexamModule} from "./unitexam/unitexam.module"
import {HomeModule} from "./home/home.module";
import {ManagerModule} from "./manager/manager.module";
import {ItemmanagerModule} from "./manager/itemmanager/itemmanager.module";
import { UsercenterModule } from './usercenter/usercenter.module';

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
    Ng2BootstrapModule.forRoot(), /*导入全部的ngx-bootstrap模块*/
    /*angular2默认采用HTML5的pushState来管理路由，它会导致前端路由与后端路由的冲突，例如当部署到nginx环境时，
    我们通过首页进入子路由一切正常，但是在子路由路径下，刷新就会报404了。默认情况下nginx会当成这个路径是实际web路径下的资源而去定位它，
    但可想而知实际是并不存在的。折中的方案可以改回hash风格*/
    RouterModule.forRoot(appRoutes, {useHash: false}), /*angular2项目中url去掉#(即哈希路由)*/
    UnitexamModule,
    UsercenterModule,
    HomeModule,
    ManagerModule,
    ItemmanagerModule,
  ],
  providers: [/*声明模块中使用的服务的提供者,对于appModule来说,也应该就是控制菜单显示了，即权限控制*/

  ],
  bootstrap: [/*根模块中的引导组件，应用启动过程中，会创建这个数组中的组件并插入到HTML中，一般只有一个引导组件*/
    AppComponent
  ]
})
// 使用export语句，创建模块的类并暴露出去。模块、组件只有暴露出去，其他的模块才能引用
export class AppModule {
}
