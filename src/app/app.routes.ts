import { UserCenterComponent } from './usercenter/usercenter.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UnitExamComponent} from "./unitexam/unitexam.component";

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
    path: "unitexam/:testType",
    component: UnitExamComponent
  },
  {
    path: "usercenter",
    component: UserCenterComponent
  },
  {
  	path:'manager',  // **代表该路由是一个通配符路径。如果当前URL无法匹配上我们配置过的任何一个路由中的路径，路由器就会匹配上这一个。当需要显示404页面或者重定向到其它路由时，该特性非常有用。
  	loadChildren:'./manager/manager.module#ManagerModule'  //嵌套路由,二级路由子路由，当路由参数中又包含‘manager’,将跳转到managerModule中，使用该模块路由
  }

];

