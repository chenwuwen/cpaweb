import {RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UnitexamComponent} from "./unitexam/unitexam.component";
import {ManagerComponent} from "./manager/manager.component";

export const appRoutes = [
  {
    path: '', // empty path匹配各级路由的默认路径。 它还支持在不扩展URL路径的前提下添加路由。
    redirectTo: 'home', //重定向路由
    pathMatch: 'full'
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "unitexam/:typeCode",
    component: UnitexamComponent
  },
  {
    path: "manager",
    component: ManagerComponent
  }
  // {
  // 	path:'**',  // **代表该路由是一个通配符路径。如果当前URL无法匹配上我们配置过的任何一个路由中的路径，路由器就会匹配上这一个。当需要显示404页面或者重定向到其它路由时，该特性非常有用。
  // 	loadChildren:'./home/home.module#HomeModule'  //路由懒加载
  // }

];

