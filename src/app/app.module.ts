import { BrowserModule } from '@angular/platform-browser'; /*每个在浏览器中运行的应用的根模块都需要引入BrowserModule*/
import { NgModule } from '@angular/core'; /*每个模块都需要引入的核心库中的NgModule*/
import { FormsModule } from '@angular/forms'; /*表单模块，在应用中使用表单时引入*/
import { HttpModule } from '@angular/http'; /*http模块，当需要进行http远程请求时引入*/
import {Ng2BootstrapModule} from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';  /*路由模块*/

import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {appRoutes} from './app.routes';
import { UnitexamComponent } from './unitexam/unitexam.component';


@NgModule({
  declarations: [   /*声明属于本模块的组件，每个组件必须在且仅在一个模块中声明*/
    AppComponent,
    HomeComponent,
    UnitexamComponent
  ],
  imports: [     /*引入买本模块中用到的模块，该模块是处于import语句引入的模块中*/
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2BootstrapModule.forRoot(), /*导入全部的ngx-bootstrap模块*/
    RouterModule.forRoot(appRoutes,{useHash:false})  /*angular2项目中url去掉#(即哈希路由)*/
  ],
  providers: [  /*声明模块中使用的服务的提供者*/

  ],
  bootstrap: [   /*根模块中的引导组件，应用启动过程中，会创建这个数组中的组件并插入到HTML中，一般只有一个引导组件*/
    AppComponent
  ]
})
// 使用export语句，创建模块的类并暴露出去。模块、组件只有暴露出去，其他的模块才能引用
export class AppModule { }
