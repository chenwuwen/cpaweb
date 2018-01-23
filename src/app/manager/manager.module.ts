import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagerComponent} from './manager.component';
import {RouterModule} from '@angular/router';
import {managerRoutes} from './manager.routes';
import {DashboardModule} from './dashboard/dashboard.module';
import {ItemmanagerModule} from './itemmanager/itemmanager.module';
import {UserManagerModule} from './user/usermanager.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(managerRoutes), /*子路由使用forChild*/
    DashboardModule,
    ItemmanagerModule,
    UserManagerModule
  ],
  declarations: [ManagerComponent]
})
export class ManagerModule {
}
